import Link from "next/link"

export default function Admin(){
    return(
        <main>
            <h1 className="text-center text-xl font-semibold m-5">Dashboard</h1>
            <div className="m-20">
                <ul className="flex space-x-10 font-bold justify-evenly text-white">
                    <li className="p-10 m-10 bg-red-700">Student Portal</li>
                    <li className="p-10 m-10 bg-red-700">Exam Portal</li>
                </ul>
            </div>
        </main>
    )
}