export interface IWay {
    id: string
    name: string
    title: string
}

export interface IWayFormValues {
    from: string
    to: string
    fromCode: string
    toCode: string
}

export interface IEditWayModalProps {
    showEditModal: boolean
    setShowEditModal: Function
    setFormValues: Function
    update: Function
    formValues: IWayFormValues
}