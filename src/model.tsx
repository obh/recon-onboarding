export interface PipelineConfig {
    name: string
    gateway: string
    rawColumnString: string
    columns: string[]
    inputTransforms: []

}