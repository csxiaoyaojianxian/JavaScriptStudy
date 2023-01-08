import { Node, parseTree } from "jsonc-parser";
import useGraph from "src/store/useGraph";
import useStored from "src/store/useStored";

const calculateSize = (text: string | [string, string][], isParent = false) => {
  const isFolded = useGraph.getState().foldNodes;
  const isImagePreview = useStored.getState().imagePreview;
  let lineCounts = 1;
  let lineLengths: number[] = [];

  if (typeof text === "string") {
    lineLengths.push(text.length);
  } else {
    lineCounts = text.map(([k, v]) => {
      const length = `${k}: ${v}`.length;
      const line = length > 150 ? 150 : length;
      lineLengths.push(line);
      return `${k}: ${v}`;
    }).length;
  }

  const longestLine = Math.max(...lineLengths);

  const getWidth = () => {
    if (text.length === 0) return 35;
    if (Array.isArray(text) && !text.length) return 40;
    if (!isFolded) return 35 + longestLine * 7.8 + (isParent ? 60 : 0);
    if (isParent && isFolded) return 170;
    return 200;
  };

  const getHeight = () => {
    if (lineCounts * 17.8 < 30) return 40;
    return (lineCounts + 1) * 18;
  };

  const isImage =
    !Array.isArray(text) && /(https?:\/\/.*\.(?:png|jpg|gif))/i.test(text) && isImagePreview;

  return {
    width: isImage ? 80 : getWidth(),
    height: isImage ? 80 : getHeight(),
  };
};

export const parser = (jsonStr: string) => {
  try {
    let json = parseTree(jsonStr);
    let nodes: NodeData[] = [];
    let edges: EdgeData[] = [];

    const addNodes = (
      text: any,
      width: number,
      height: number,
      parent: "string" | "number" | "boolean" | "object" | "array" | "null" | false,
      isEmpty?: boolean
    ) => {
      let actualId = String(nodes.length + 1);
      nodes = [
        ...nodes,
        {
          id: actualId,
          text: text,
          width: width,
          height: height,
          data: {
            parent: parent === "array" || parent === "object" ? parent : false,
            childrenCount: parent ? 1 : 0,
            isEmpty: isEmpty,
          },
        },
      ];
      return actualId;
    };

    const addEdges = (from: string, to: string) => {
      edges = [
        ...edges,
        {
          id: `e${from}-${to}`,
          from: from,
          to: to,
        },
      ];
    };

    let parentName: string = "";
    let bracketOpen: { id: string; type: string }[] = [];
    let objectsFromArray: number[] = [];
    let objectsFromArrayId = 0;
    let notHaveParent: string[] = [];
    let brothersNode: [string, string][] = [];
    let brothersParentId: string | undefined = "";
    let brotherKey: string = "";
    let brothersNodeProps: {
      id: string;
      parentId: string | undefined;
      objectsFromArrayId: number | undefined;
    }[] = [];

    const traverse = (
      objectToTraverse: Node,
      parentType?: string,
      myParentId?: string,
      nextType?: string
    ) => {
      let { type, children, value } = objectToTraverse;

      if (!children) {
        if (value !== undefined) {
          if (parentType === "property" && nextType !== "object" && nextType !== "array") {
            brothersParentId = myParentId;
            if (nextType === undefined) {
              // add key and value to brothers node
              brothersNode = [...brothersNode, [brotherKey, value]];
            } else {
              brotherKey = value;
            }
          } else if (parentType === "array") {
            const { width, height } = calculateSize(String(value), false);
            const nodeFromArrayId = addNodes(String(value), width, height, false);
            if (myParentId) {
              addEdges(myParentId, nodeFromArrayId);
            }
          }
          if (nextType && parentType !== "array") {
            if (nextType === "object" || nextType === "array") {
              parentName = value;
            }
          }
        }
      } else if (children) {
        let parentId: string | undefined;

        if (type !== "property" && parentName !== "") {
          // add last brothers node and add parent node

          if (brothersNode.length > 0) {
            // add or concat brothers node of same parent
            let findBrothersNode = brothersNodeProps.find(
              e =>
                e.parentId === brothersParentId &&
                e.objectsFromArrayId === objectsFromArray[objectsFromArray.length - 1]
            );
            if (findBrothersNode) {
              let ModifyNodes = [...nodes];
              let findNode = nodes.findIndex(e => e.id === findBrothersNode?.id);

              if (ModifyNodes[findNode]) {
                ModifyNodes[findNode].text = ModifyNodes[findNode].text.concat(brothersNode);
                const { width, height } = calculateSize(ModifyNodes[findNode].text, false);
                ModifyNodes[findNode].width = width;
                ModifyNodes[findNode].height = height;
                nodes = [...ModifyNodes];
                brothersNode = [];
              }
            } else {
              const { width, height } = calculateSize(brothersNode, false);
              const brothersNodeId = addNodes(brothersNode, width, height, false);
              brothersNode = [];

              if (brothersParentId) {
                addEdges(brothersParentId, brothersNodeId);
              } else {
                notHaveParent = [...notHaveParent, brothersNodeId];
              }

              brothersNodeProps = [
                ...brothersNodeProps,
                {
                  id: brothersNodeId,
                  parentId: brothersParentId,
                  objectsFromArrayId: objectsFromArray[objectsFromArray.length - 1],
                },
              ];
            }
          }

          // add parent node
          const { width, height } = calculateSize(parentName, true);
          parentId = addNodes(parentName, width, height, type);
          bracketOpen = [...bracketOpen, { id: parentId, type: type }];
          parentName = "";

          // add edges from parent node
          let brothersProps = brothersNodeProps.filter(
            e =>
              e.parentId === myParentId &&
              e.objectsFromArrayId === objectsFromArray[objectsFromArray.length - 1]
          );
          if (
            (brothersProps.length > 0 &&
              bracketOpen[bracketOpen.length - 2] &&
              bracketOpen[bracketOpen.length - 2].type !== "object") ||
            (brothersProps.length > 0 && bracketOpen.length === 1)
          ) {
            addEdges(brothersProps[brothersProps.length - 1].id, parentId);
          } else if (myParentId) {
            addEdges(myParentId, parentId);
          } else {
            notHaveParent = [...notHaveParent, parentId];
          }
        } else if (parentType === "array") {
          objectsFromArray = [...objectsFromArray, objectsFromArrayId++];
        }
        children.forEach((branch, index, array) => {
          if (array[index + 1]) {
            traverse(
              branch,
              type,
              bracketOpen[bracketOpen.length - 1]
                ? bracketOpen[bracketOpen.length - 1].id
                : undefined,
              array[index + 1].type
            );
          } else {
            traverse(
              branch,
              type,
              bracketOpen[bracketOpen.length - 1]
                ? bracketOpen[bracketOpen.length - 1].id
                : undefined
            );
          }
        });

        if (type !== "property") {
          // when children end

          // add or concat brothers node when it is the last parent node
          if (brothersNode.length > 0) {
            let findBrothersNode = brothersNodeProps.find(
              e =>
                e.parentId === brothersParentId &&
                e.objectsFromArrayId === objectsFromArray[objectsFromArray.length - 1]
            );
            if (findBrothersNode) {
              let ModifyNodes = [...nodes];
              let findNode = nodes.findIndex(e => e.id === findBrothersNode?.id);

              if (ModifyNodes[findNode]) {
                ModifyNodes[findNode].text = ModifyNodes[findNode].text.concat(brothersNode);
                const { width, height } = calculateSize(ModifyNodes[findNode].text, false);
                ModifyNodes[findNode].width = width;
                ModifyNodes[findNode].height = height;
                nodes = [...ModifyNodes];
                brothersNode = [];
              }
            } else {
              const { width, height } = calculateSize(brothersNode, false);
              const brothersNodeId = addNodes(brothersNode, width, height, false);
              brothersNode = [];

              if (brothersParentId) {
                addEdges(brothersParentId, brothersNodeId);
              } else {
                notHaveParent = [...notHaveParent, brothersNodeId];
              }

              brothersNodeProps = [
                ...brothersNodeProps,
                {
                  id: brothersNodeId,
                  parentId: brothersParentId,
                  objectsFromArrayId: objectsFromArray[objectsFromArray.length - 1],
                },
              ];
            }
          }

          // close brackets
          if (parentType !== "array") {
            if (bracketOpen.length > 0) {
              let newBracketOpen = [...bracketOpen];
              newBracketOpen.splice(newBracketOpen.length - 1);
              bracketOpen = [...newBracketOpen];
            }
          } else if (parentType === "array") {
            if (objectsFromArray.length > 0) {
              let newobjectsFromArray = [...objectsFromArray];
              newobjectsFromArray.splice(newobjectsFromArray.length - 1);
              objectsFromArray = [...newobjectsFromArray];
            }
          }

          if (parentId) {
            let myChildrens = edges.filter(e => e.from === parentId);
            let myIndex = nodes.findIndex(e => e.id === parentId);

            let ModifyNodes = [...nodes];
            if (ModifyNodes[myIndex]) {
              ModifyNodes[myIndex].data.childrenCount = myChildrens.length;
              nodes = [...ModifyNodes];
            }
          }
        }
      }
    };

    if (json) {
      traverse(json);

      if (notHaveParent.length > 1) {
        if (json.type !== "array") {
          const text = "";
          const { width, height } = calculateSize(text, false);
          const emptyId = addNodes(text, width, height, false, true);
          notHaveParent.forEach(children => {
            addEdges(emptyId, children);
          });
        }
      }

      if (nodes.length === 0) {
        if (json.type === "array") {
          const text = "[]";
          const { width, height } = calculateSize(text, false);
          addNodes(text, width, height, false);
        } else {
          const text = "{}";
          const { width, height } = calculateSize(text, false);
          addNodes(text, width, height, false);
        }
      }
    }

    return { nodes, edges };
  } catch (error) {
    console.error(error);
    return {
      nodes: [],
      edges: [],
    };
  }
};
