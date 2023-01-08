import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { baseURL } from "src/constants/data";
import { darkTheme, lightTheme } from "src/constants/theme";
import useGraph from "src/store/useGraph";
import useJson from "src/store/useJson";
import styled, { ThemeProvider } from "styled-components";

const GraphCanvas = dynamic(
  () => import("src/containers/Editor/LiveEditor/GraphCanvas").then(c => c.GraphCanvas),
  {
    ssr: false,
  }
);

const StyledAttribute = styled.a`
  position: fixed;
  bottom: 0;
  right: 0;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  background: ${({ theme }) => theme.SILVER_DARK};
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 3px 0 0 0;
  opacity: 0.8;

  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

interface EmbedMessage {
  data: {
    json?: string;
    options?: any;
  };
}

const WidgetPage = () => {
  const { query, push, isReady } = useRouter();
  const [theme, setTheme] = React.useState("dark");
  const fetchJson = useJson(state => state.fetchJson);
  const setGraph = useGraph(state => state.setGraph);

  React.useEffect(() => {
    if (isReady) {
      fetchJson(query.json);
      if (!inIframe()) push("/");
    }
  }, [fetchJson, isReady, push, query.json]);

  React.useEffect(() => {
    const handler = (event: EmbedMessage) => {
      try {
        if (!event.data?.json) return;
        if (event.data?.options?.theme === "light" || event.data?.options?.theme === "dark") {
          setTheme(event.data.options.theme);
        }

        setGraph(event.data.json, event.data.options);
      } catch (error) {
        console.error(error);
        toast.error("Invalid JSON!");
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setGraph, theme]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <GraphCanvas isWidget />
      <StyledAttribute href={`${baseURL}/editor`} target="_blank" rel="noreferrer">
        jsoncrack.com
      </StyledAttribute>
    </ThemeProvider>
  );
};

export default WidgetPage;
