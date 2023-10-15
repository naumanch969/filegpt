"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/interfaces'
import Cookie from 'js-cookie'


export default function App() {

    const router = useRouter()
    const loggedUser: User | null = Cookie.get('askexpert_profile') ? JSON.parse(Cookie.get('askexpert_profile')) : null

    useEffect(() => {
        if (!Boolean(loggedUser?.name)) return router.push('/auth/login')
        else if (!Boolean(loggedUser?.category)) return router.push('/auth/category')
        else {
            router.push('/dashboard')
        }
    }, [])

    return (
        <></>
    )
}