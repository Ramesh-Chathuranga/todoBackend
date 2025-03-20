import { RecurrenceConfig, TaskPriority } from "./modal/task";

export const priorityList: TaskPriority[] = ['High', 'Medium', 'Low'];
export const recurrenceList: RecurrenceConfig[] = [{ label: 'One-time', value: 'none' }, { label: 'Daily', value: 'daily' }, { label: 'Weekly', value: "weekly" }, { label: 'Monthly', value: "monthly" }];

export const recurrenceLabel: {
    none: string,
    daily: string,
    monthly: string,
    weekly: string
} = {
    none: 'One-time',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly'
};


export const setText = (text: string) => {
    const target = {
        target: {
            value: text
        }
    }
    return target
} 
