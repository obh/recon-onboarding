import {Idempotent}  from './Utils';

export interface PipelineConfig {
    name: string
    gateway: string
    reconType: string
    rawColumnString: string
    columns: string[]
    inputTransforms: []

}

export type Column = {
    name: String
    output: String
    input_ex?: String
    output_ex?: String
    transform: Function
    isRequired: boolean
    description?: string
}

export type GatewayRecon = {
    gateway: string;
    version: string;
    columns: Column[];
}

export class RazorpayRecon implements GatewayRecon {
    gateway: string = "razorpay";
    version: string = "1.0.0";
    columns: Column[] = [];

    constructor() {
        this.columns.push(
            {
                name: "transaction_entity", 
                output: "entity", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "payment", 
                output_ex:"transaction"
            },
            {
                name: "entity_id",
                output: "entity_id", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "pay_M8CKY7ysponuLb", 
                output_ex:"pay_M8CKY7ysponuLb"
            },
            {
                name: "amount", 
                output: "amount", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "50.00", 
                output_ex:"50.00"
            },
            {
                name: "currency", 
                output: "currency", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "INR", 
                output_ex:"INR"
            },
            {
                name: "fee (exclusive tax)", 
                output: "service_charge", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "1.89", 
                output_ex:"1.89"
            },
            {
                name: "tax", 
                output: "service_tax", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "1.89", 
                output_ex:"1.89"
            },
            {
                name: "payment_method", 
                output: "payment_method", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "card", 
                output_ex:"card"
            },
            {
                name: "card_type", 
                output: "card_type", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "credit", 
                output_ex:"credit"
            },
            {
                name: "entity_created_at", 
                output: "created_at", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "30/06/2023 21:24:34", 
                output_ex:"2023-06-03 21:34:34"
            },
            {
                name: "order_id", 
                output: "parent_id", 
                isRequired:true, 
                transform: Idempotent, 
                input_ex: "order_M8CJrxNpxgzNeS", 
                output_ex:"2023-06-03 21:34:34"
            },



        )
    }
    
}

