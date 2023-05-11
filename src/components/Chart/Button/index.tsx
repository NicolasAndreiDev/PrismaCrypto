import { UserContext } from "@/providers/userProvider"
import axios from "axios"
import { useState, useContext, useEffect } from "react"

export default function Button({ className, cryptos }: { className: string, cryptos: string }) {
    const { user, updateUser } = useContext(UserContext)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const filtercoins = user?.favcoins.filter(coins => coins.coin == cryptos)
            if(filtercoins){
                setIsFavorite(filtercoins.length > 0)
            }
        }
        fetchData()
    }, [user])

    async function handleClick() {
        try {
            if (isFavorite) {
                const id = user?.favcoins.find(coins => coins.coin == cryptos)?.id
                await axios.delete(`http://localhost:4000/users/favcoins/${user?.id}/${id}`)
                setIsFavorite(false)
            } else {
                await axios.put(`http://localhost:4000/users/${user?.id}`, { coin: cryptos })
                setIsFavorite(true)
            }
            updateUser()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>  
            <button className={className} style={isFavorite ? { backgroundColor: 'red' } : {}} onClick={handleClick}>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
        </>
    )
}
