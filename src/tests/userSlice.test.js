import reducer, {clearLoginStatus} from '../redux-store/userSlice'
it("should return initial state of user slice",()=>{
    expect(reducer(undefined,{})).toEqual({
        userObj:{},
        isSuccess:false,
        isLoading: false,
        isError:false,
        invalidLoginMessage:''
    })
})

it("should clear login state while logout", () => {
    expect(
        reducer(
            {
                userObj: { name: "xyz" },
                isSuccess: true,
            },
            clearLoginStatus()
        )
    ).toEqual({
        userObj: {},
        isSuccess: false,
    });
});