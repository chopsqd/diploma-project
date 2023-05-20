export const parseData = (from: string = '', to: string, fromCode: string, toCode: string) =>
    (
        {
            title: `${from}->${to}`,
            name: `${fromCode}->${toCode}`
        }
    )