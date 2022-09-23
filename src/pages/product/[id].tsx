import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { isFallback } = useRouter();

    if (isFallback) {
        return (
            <p>loading...</p>
        )
    }

    return (
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt={product.name} />
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{product.price}</span>

                <p>{product.description}</p>

                <button>Comprar agora</button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos / mais acessados
    // Então iria passar o ID deles ali embaixo, tornando a vida do usuário mais fácil

    return {
        paths: [
            { params: { id: 'prod_MTuVHd1rWMa1Dx' } }
        ],
        //fallback: 'blocking' Essa opção carrega o produto antes de carregar o HTML da página
        fallback: true,
    }
}

// O Primeiro parametro do Generics do GetStaticProps é o retorno em props
// O Segundo é qual são os parametros que são esperados na rota
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }).format(price.unit_amount / 100),
                description: product.description
            }
        },
        revalidate: 60 * 60 * 1 // 1 Hora
    }
}