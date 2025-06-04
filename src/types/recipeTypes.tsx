export type UnitType = {
    name: string,
    amount: number,
    unit: string,
}

export type IngreType = {
    sortName: string,
    units: UnitType[]
}

export type StepType = {
    stepNum: number,
    imgUrl: string,
    content: string,
}

export type CommentType = {
    profileImg: string,
    userId: string,
    time: string,
    content: string,
}

export type SelectedRecipeType = {
    recipeId: string,
    title: string,
    mainSolt: string,
    subSolt: string,
    portion: number,
    time: number,
    imgUrl: string,
    ingres: IngreType[],
    steps: StepType[],
    comments: CommentType[]
}