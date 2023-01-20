import React from 'react'
import { useGetAllUsersQuery } from '../../services/user/userPAI'

export default function Home() {
    const { data, isLoading, isSuccess } = useGetAllUsersQuery()
    return (
        <>
            {
                isLoading ? <div>loading .........</div> : isSuccess ? data.user.map(u => <p key={u._id}>{u.name}</p>) : null
            }
            <div>Home dashborad</div>
        </>
    )
}
