import Image from "next/future/image";
import { useRouter } from "next/router"
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";


export default function Product() {
    const { query } = useRouter();

    return (
        <ProductContainer>
            <ImageContainer>
                {/* <Image /> */}
            </ImageContainer>
            <ProductDetails>
                <h1>Camiseta X</h1>
                <span>R$ 79, 90</span>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit veritatis ipsam soluta ullam iste. Perferendis ea ducimus facilis nisi minus quas delectus! Adipisci nam dolore culpa possimus soluta harum nulla.</p>

                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}