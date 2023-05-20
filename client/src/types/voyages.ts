export interface IStopData {
    time: string
    name: string
}

interface IVoyageData {
    startTime: string
    endTime: string
    price: string
    wayTime: string
    days: string
    fromStation: string
    toStation: string
    stops: IStopData[]
    busInfo: string
    places: number[]
    placesCount: number
}
export interface IVoyage {
    id: number
    title: string
    name: string
    data: IVoyageData
}

export interface IVoyageParsed {
    createInput: IInputData & {
        stops: IStopData[]
    }
    from: string
    fromCode: string
    to: string
    toCode: string
}

export interface IInputData {
    startTime: string
    endTime: string
    wayTime: string
    days: string
    price: number
    placesCount: number
    fromStation: string
    toStation: string
    busInfo: string
}

export interface IVoyageModalProps {
    isVisible: boolean
    setIsVisible: Function
    isEdit: boolean
    formValues: IVoyageParsed
    setFormValues: Function
    update: Function
    create: Function
}