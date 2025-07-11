export interface IJsonSave {
    lastModified: string;
    background: string;
    splitBackground: {
        first: string;
        second: string;
    };
    text: {
        nameTag: string;
        dialogue: string;
    };
    models: {
        from: string;
        character: string;
        modelName: string;
        modelTransform: { x: number; y: number; scale: number };
        modelExpression: number;
        modelPose: number;
        modelParametersChanged: Record<string, number> | undefined;
        modelIdle: boolean;
    }[];
}
