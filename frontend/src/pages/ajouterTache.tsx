import AjouterForm from "@/components/own/ajouter";
import Header from "@/components/own/header";


export default function AjouterTache() {
    return (
    <>
        <Header/>

        <main className="h-[90vh] flex justify-center">
            <AjouterForm/>
        </main>
        
    </>
    )

}