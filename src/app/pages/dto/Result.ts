export interface Result<TValue>{
    data:TValue
    IsError:boolean
    IsSuccess: boolean
    errorMessage: string | undefined | null
}
  