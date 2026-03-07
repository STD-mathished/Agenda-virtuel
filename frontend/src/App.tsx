import { useEffect, useState } from 'react';
import './App.css';
import HeaderApp from './components/header-app';
import keycloak from './keycloak.ts';
import type { KeycloakProfile } from 'keycloak-js';
import type { ExtendedUserInfo } from './types/extended-user-info.ts';
import FooterApp from './components/footer-app.tsx';




export default function App() {

 const [userInfo,setUserInfo] = useState<ExtendedUserInfo | null>(null)

useEffect(() => {
    console.log("App initialisation, keycloak instance:", keycloak);
    keycloak.loadUserInfo().then((user) => {
      console.log("User info fetched:", user);
      setUserInfo(user as KeycloakProfile);
    }).catch(err => {
      console.error("Erreur lors du chargement des infos utilisateur", err);
    });
  }, []); 

  return(
    <>
      <HeaderApp userInfo={userInfo}/>

      <main className='ml-10 mr-10'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti debitis minima veniam tenetur quibusdam, veritatis cum nobis voluptate, quasi praesentium fugiat soluta asperiores architecto nemo commodi suscipit dolores accusantium. Ducimus.
        Quam, rerum vitae. Ex fugit accusamus quibusdam sapiente neque dolores ipsum earum fuga veniam voluptatibus. Animi explicabo esse numquam, ratione aut quasi ipsa odio in voluptatum iste omnis ullam vel.
        Veniam quis, hic cupiditate libero, rem soluta commodi velit enim unde perspiciatis ullam quae, consequuntur culpa officiis rerum asperiores suscipit quibusdam provident in eum sapiente laboriosam recusandae animi! Accusantium, ipsa.
        Itaque, eos voluptatibus. Ut molestiae assumenda magnam recusandae voluptatibus voluptas nulla saepe consectetur quo expedita officia repudiandae ea illo animi corrupti magni a, facere quidem nesciunt aperiam sequi esse exercitationem.
        Aliquam provident ex quis optio quos reprehenderit tempora commodi reiciendis, quasi natus doloribus saepe nostrum necessitatibus? Maxime veritatis officia et dolorum. Dolorum, blanditiis culpa reiciendis sunt expedita sapiente inventore perspiciatis?
        Repellendus, consequuntur pariatur! Nisi quos inventore odio excepturi repudiandae eveniet, accusantium quam iure ratione minus hic facere ullam. Sapiente at, beatae explicabo deserunt totam inventore quos dolore repudiandae consequuntur est!
        Saepe adipisci perferendis officia cupiditate labore earum eligendi repudiandae ea voluptatum, odit sapiente! Deserunt esse ea, optio aliquid magnam quos quisquam totam veniam sit aperiam aspernatur ab, quo dolorum sed?
        Doloremque, libero eos, eligendi earum enim odit, asperiores dolorem magni necessitatibus dignissimos ratione harum eum veniam reprehenderit quae voluptas nemo cupiditate quas nulla culpa. Iusto, totam maxime! Atque, iste voluptatem.
        Explicabo error, porro cupiditate iusto ipsa blanditiis ducimus neque facilis aliquid, ex atque nihil reprehenderit esse nam voluptatibus aut omnis exercitationem ab. Exercitationem facere hic impedit nesciunt alias commodi numquam.
        Perferendis doloremque, vero, distinctio error aliquid fugiat beatae saepe blanditiis officia fuga, quis cupiditate maiores voluptatem! Distinctio harum voluptates pariatur labore soluta laboriosam inventore nobis ullam, dolorum officiis commodi. Officiis.
        Natus nam quasi aliquid hic, distinctio laborum sed. A delectus ea nobis molestias sit fugit laboriosam pariatur necessitatibus tempora commodi nulla nesciunt, magni voluptas corporis reprehenderit provident ex assumenda saepe.
        Dignissimos delectus nisi voluptates magni corrupti laborum error distinctio corporis nam perspiciatis, quae vel eos provident eaque quisquam consequatur ea vero ipsa quam ut! Consectetur accusamus ullam inventore illum ratione.
        Incidunt ducimus sed praesentium eveniet molestias officiis libero fugiat aperiam non ullam deserunt culpa vitae esse assumenda accusantium odit, a natus saepe reprehenderit eaque sequi voluptatem. Accusantium facilis veritatis quasi.
        Aliquam iure hic voluptatibus libero ad ipsa fuga, delectus necessitatibus illum ratione eligendi beatae blanditiis suscipit labore inventore cum tempore provident deserunt esse unde obcaecati! Repellendus aliquid laudantium eveniet magni!
        Unde ipsam eligendi temporibus quaerat error. Officiis error eligendi soluta repudiandae, et recusandae numquam ipsum quod. Harum, iure provident voluptatibus aspernatur repudiandae autem blanditiis quam deserunt. Saepe, incidunt eum! Assumenda.
        Aliquid corrupti tempora rem ut harum corporis unde! Magni qui error facilis, totam tempora quod exercitationem veritatis repellendus quos dolore modi possimus id animi fugit fugiat similique rem ullam eveniet.
        Dolores dignissimos assumenda odit repudiandae perspiciatis, rerum, ducimus, quo excepturi blanditiis architecto quas natus minus labore omnis quaerat delectus ipsum vitae! Laboriosam, sed aperiam non voluptatum tempore maxime illum inventore.
        Quia esse vero praesentium, delectus voluptatem aperiam iusto quos, voluptas ab neque ducimus molestiae vel necessitatibus, nam quam exercitationem ad quidem cupiditate. Rem odio magni possimus veritatis ipsa! Officiis, tempora?
        Eius sequi quas minima doloribus possimus, perspiciatis exercitationem. Reprehenderit nisi exercitationem repellat, minima, obcaecati officiis iste ea corporis dolorem tempore quasi sunt ipsam eius totam, culpa saepe vitae possimus esse.
        Repellat reprehenderit ullam corporis, soluta maiores mollitia quisquam ipsa architecto? Nobis et excepturi soluta numquam, voluptates distinctio eius vel sit? Quasi dignissimos asperiores sunt ullam doloremque hic tenetur fuga aspernatur.
        Soluta consectetur mollitia veniam aliquid tempore qui laboriosam, ipsam, molestias cumque deserunt, nihil inventore quam ad vitae. Enim similique quae vitae quidem. Voluptatem sequi quidem repellat, nemo quis vel odio?
        Earum alias rerum atque, odio possimus sed odit ducimus id veritatis quis porro ab. Veniam delectus ut inventore ad doloribus fugiat, quo, impedit unde earum consequatur, assumenda illum ducimus perferendis!
        Doloribus odit illum animi, alias quaerat, voluptas eaque nesciunt ipsum blanditiis accusamus quasi omnis in sunt repudiandae quidem commodi voluptate nemo? Ducimus eos odio asperiores eligendi culpa fuga cupiditate qui.
        Incidunt rem doloribus necessitatibus fuga quisquam ex hic vitae consequuntur excepturi qui labore iste numquam praesentium, possimus assumenda aliquid? Vitae, nostrum deleniti possimus earum magni atque officiis sapiente eius ipsa.
        Illum, ex quia ipsa aut consequatur quo incidunt voluptatibus ullam. Natus perferendis nisi aut dignissimos dicta excepturi ex, laudantium amet esse eum sequi vel nesciunt aperiam reprehenderit autem laboriosam illum.</p>
      </main>
      <FooterApp/>
    </>
    
  )
}
