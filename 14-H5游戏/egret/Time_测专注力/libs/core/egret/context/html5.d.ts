/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.HTML5DeviceContext
     * @classdesc
     * @extends egret.DeviceContext
     */
    class HTML5DeviceContext extends DeviceContext {
        frameRate: number;
        private _time;
        private static instance;
        /**
         * @method egret.HTML5DeviceContext#constructor
         */
        constructor(frameRate?: number);
        static requestAnimationFrame: Function;
        static cancelAnimationFrame: Function;
        static _thisObject: any;
        static _callback: Function;
        private _requestAnimationId;
        private enterFrame();
        /**
         * @method egret.HTML5DeviceContext#executeMainLoop
         * @param callback {Function}
         * @param thisObject {any}
         */
        executeMainLoop(callback: Function, thisObject: any): void;
        private reset();
        private _isActivate;
        private registerListener();
    }
}
declare module egret_html5_localStorage {
    function getItem(key: string): string;
    function setItem(key: string, value: string): boolean;
    function removeItem(key: string): void;
    function clear(): void;
    function init(): void;
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.HTML5CanvasRenderer
     * @classdesc
     * @extends egret.RendererContext
     */
    class HTML5CanvasRenderer extends RendererContext {
        private canvas;
        /**
         * @member egret.HTML5CanvasRenderer#canvasContext
         */
        canvasContext: CanvasRenderingContext2D;
        private _matrixA;
        private _matrixB;
        private _matrixC;
        private _matrixD;
        private _matrixTx;
        private _matrixTy;
        _transformTx: number;
        _transformTy: number;
        private blendValue;
        private globalAlpha;
        private _cacheCanvas;
        _cacheCanvasContext: any;
        constructor(canvas?: HTMLCanvasElement);
        private createCanvas();
        clearScreen(): void;
        clearRect(x: number, y: number, w: number, h: number): void;
        drawImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat?: any): void;
        drawRepeatImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat: any): void;
        setTransform(matrix: Matrix): void;
        setAlpha(alpha: number, blendMode: string): void;
        private blendModes;
        private initBlendMode();
        setupFont(textField: TextField): void;
        measureText(text: string): number;
        drawText(textField: TextField, text: string, x: number, y: number, maxWidth: number, style: Object): void;
        strokeRect(x: any, y: any, w: any, h: any, color: any): void;
        pushMask(mask: Rectangle): void;
        popMask(): void;
        onRenderStart(): void;
        onRenderFinish(): void;
    }
}
declare module egret_h5_graphics {
    function beginFill(color: number, alpha?: number): void;
    function drawRect(x: number, y: number, width: number, height: number): void;
    function drawCircle(x: number, y: number, r: number): void;
    function drawRoundRect(x: number, y: number, width: number, height: number, ellipseWidth: number, ellipseHeight?: number): void;
    function drawEllipse(x: number, y: number, width: number, height: number): void;
    function lineStyle(thickness?: number, color?: number, alpha?: number, pixelHinting?: boolean, scaleMode?: string, caps?: string, joints?: string, miterLimit?: number): void;
    function lineTo(x: number, y: number): void;
    function curveTo(controlX: Number, controlY: Number, anchorX: Number, anchorY: Number): void;
    function moveTo(x: number, y: number): void;
    function clear(): void;
    function createEndFillCommand(): void;
    function endFill(): void;
    function _fill(): void;
    function createEndLineCommand(): void;
    function _draw(renderContext: egret.RendererContext): void;
    function _setStyle(colorStr: string): void;
    function init(): void;
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.WebGLRenderer
     * @classdesc
     * @extends egret.RendererContext
     */
    class WebGLRenderer extends RendererContext {
        private canvas;
        private gl;
        private size;
        private vertices;
        private vertSize;
        private indices;
        private projectionX;
        private projectionY;
        private shaderManager;
        constructor(canvas?: HTMLCanvasElement);
        private createCanvas();
        private contextLost;
        private handleContextLost();
        private handleContextRestored();
        private initWebGL();
        private glContextId;
        private vertexBuffer;
        private indexBuffer;
        private setContext(gl);
        private blendModesWebGL;
        private initBlendMode();
        private start();
        clearScreen(): void;
        private currentBlendMode;
        private setBlendMode(blendMode);
        private currentBaseTexture;
        private currentBatchSize;
        drawRepeatImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat: any): void;
        drawImage(texture: Texture, sourceX: any, sourceY: any, sourceWidth: any, sourceHeight: any, destX: any, destY: any, destWidth: any, destHeight: any, repeat?: any): void;
        private _draw();
        private worldTransform;
        setTransform(matrix: Matrix): void;
        private worldAlpha;
        setAlpha(value: number, blendMode: string): void;
        createWebGLTexture(texture: Texture): void;
        private maskList;
        private maskDataFreeList;
        pushMask(mask: Rectangle): void;
        popMask(): void;
        private colorTransformMatrix;
        setGlobalColorTransform(colorTransformMatrix: any[]): void;
        private canvasContext;
        setupFont(textField: TextField): void;
        measureText(text: string): number;
        private graphicsPoints;
        private graphicsIndices;
        private graphicsBuffer;
        private graphicsIndexBuffer;
        private renderGraphics(graphics);
        private updateGraphics(graphics);
        private buildRectangle(graphicsData);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    class WebGLUtils {
        static compileProgram(gl: any, vertexSrc: any, fragmentSrc: any): any;
        static compileFragmentShader(gl: any, shaderSrc: any): any;
        static compileVertexShader(gl: any, shaderSrc: any): any;
        private static _compileShader(gl, shaderSrc, shaderType);
        private static canUseWebGL;
        static checkCanUseWebGL(): boolean;
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    class WebGLShaderManager {
        private gl;
        private maxAttibs;
        private attribState;
        private tempAttribState;
        constructor(gl: any);
        currentShader: any;
        defaultShader: EgretShader;
        primitiveShader: PrimitiveShader;
        colorTransformShader: ColorTransformShader;
        setContext(gl: any): void;
        activateShader(shader: any): void;
        private setAttribs(attribs);
    }
    class EgretShader {
        private defaultVertexSrc;
        private gl;
        program: any;
        fragmentSrc: string;
        private uSampler;
        projectionVector: any;
        private offsetVector;
        private dimensions;
        aVertexPosition: any;
        aTextureCoord: any;
        colorAttribute: any;
        attributes: any[];
        uniforms: any;
        constructor(gl: any);
        init(): void;
        initUniforms(): void;
        syncUniforms(): void;
    }
    class ColorTransformShader extends EgretShader {
        fragmentSrc: string;
        uniforms: {
            matrix: {
                type: string;
                value: number[];
            };
            colorAdd: {
                type: string;
                value: {
                    x: number;
                    y: number;
                    z: number;
                    w: number;
                };
            };
        };
        constructor(gl: any);
    }
    class PrimitiveShader {
        private gl;
        program: any;
        projectionVector: any;
        offsetVector: any;
        tintColor: any;
        aVertexPosition: any;
        colorAttribute: any;
        attributes: any[];
        translationMatrix: any;
        alpha: any;
        fragmentSrc: string;
        vertexSrc: string;
        constructor(gl: any);
        private init();
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.HTML5NetContext
     * @classdesc
     * @extends egret.NetContext
     */
    class HTML5NetContext extends NetContext {
        constructor();
        proceed(loader: URLLoader): void;
        private loadSound(loader);
        private getXHR();
        private setResponseType(xhr, responseType);
        private loadTexture(loader);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    class HTML5TouchContext extends TouchContext {
        private _isTouchDown;
        private rootDiv;
        constructor();
        private prevent(event);
        run(): void;
        private addMouseListener();
        private addTouchListener();
        private inOutOfCanvas(event);
        private dispatchLeaveStageEvent();
        private _onTouchBegin(event);
        private _onTouchMove(event);
        private _onTouchEnd(event);
        private getLocation(rootDiv, event);
    }
}
/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
declare module egret {
    /**
     * @class egret.StageText
     * @classdesc
     * @extends egret.HashObject
     */
    class HTML5StageText extends StageText {
        private div;
        private inputElement;
        private _shape;
        constructor();
        private getStageDelegateDiv();
        _setMultiline(value: boolean): void;
        private callHandler(e);
        _add(): void;
        /**
         * @method egret.StageText#remove
         */
        _remove(): void;
        private _hasListeners;
        _addListeners(): void;
        _removeListeners(): void;
        private _inputType;
        private createInput();
        /**
         * @method egret.StageText#open
         * @param x {number}
         * @param y {number}
         * @param width {number}
         * @param height {number}
         */
        _open(x: number, y: number, width?: number, height?: number): void;
        _setScale(x: number, y: number): void;
        changePosition(x: number, y: number): void;
        private setStyles();
        private _isShow;
        /**
         * @method egret.StageText#add
         */
        _show(): void;
        _hide(): void;
        private textValue;
        /**
         * @method egret.StageText#getText
         * @returns {string}
         */
        _getText(): string;
        /**
         * @method egret.StageText#setText
         * @param value {string}
         */
        _setText(value: string): void;
        private resetText();
        private _width;
        _setWidth(value: number): void;
        private _height;
        _setHeight(value: number): void;
        private _styleInfoes;
        private setElementStyle(style, value);
    }
}
