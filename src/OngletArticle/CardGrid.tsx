import React, { useState } from 'react';

// Importez vos fichiers média
import videoFile from '../assets/VID_20251204_225643.mp4';
import podcastFile from './Katherine_Johnson_le_cerveau_plus_fiable_qu_IBM.m4a';

// Importez toutes vos images
import wifiImg from './image/wifi.jpg';
import soleilImg from './image/soleil.jpg';
import medic3DImg from './image/3Dmedic.jpg';
import quantiqueImg from './image/quantique.jpg';
import cryptoImg from './image/crypto.jpg';
import calculatriceImg from './image/calculatrice.jpg';
import sansEllesImg from './image/sanselles.jpg';

interface Card {
  id: number;
  title: string;
  bio: string;
  size: 'small' | 'medium' | 'large';
  color: 'yellow' | 'blue' | 'red' | 'pink';
  media?: 'audio' | 'video';
  mediaSource?: string;
  image?: string;
}

const CardGrid: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (id: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const cards: Card[] = [
    {
      id: 1,
      title: "Les pionnières du sans-fil",
      bio: "Hedy Lamarr, née Hedwig Kiesler en 1914 à Vienne, est d'abord devenue célèbre à Hollywood pour ses rôles dans les années 1930 et 1940. Derrière son image de star glamour, elle cultivait pourtant une curiosité scientifique étonnante. En 1941, pendant la Seconde Guerre mondiale, elle met au point avec le compositeur George Antheil un système de transmission radio basé sur le « saut de fréquence ». Ce brevet, ignoré à l'époque, est devenu par la suite l'un des fondements des technologies sans fil modernes.",
      size: "large",
      color: "yellow",
      image: wifiImg
    },
    {
      id: 2,
      title: "L’innovation solaire au féminin",
      bio: "Maria Telkes, née en 1900 à Budapest, est une pionnière de l'énergie solaire. Elle se fait connaître pour ses recherches novatrices au MIT, où elle développe des systèmes de chauffage solaire. L'une de ses réalisations les plus célèbres est la \"Dover Sun House\", une maison expérimentale des années 1940 chauffée presque entièrement grâce à l'énergie solaire. Souvent surnommée \"la reine du soleil\", elle est aujourd'hui reconnue comme l'une des grandes figures de l'innovation énergétique du XXᵉ siècle.",
      size: "medium",
      color: "blue",
      image: soleilImg
    },
    {
      id: 4,
      title: "Celle sans qui ce site n'existerait pas",
      bio: "Découvrez la personne qui a rendu ce projet possible, son parcours et sa contribution exceptionnelle au développement de ce site.",
      size: "medium",
      color: "red",
      media: "video",
      mediaSource: videoFile,
      image: sansEllesImg
    },
    {
      id: 5,
      title: "Impression 3D au service de la santé",
      bio: "Nneile Nkholise est une entrepreneure sud-africaine et ingénieure passionnée par l'innovation au service des gens et de l'environnement. En 2015, elle fonde iMed Tech, une entreprise qui conçoit des prothèses médicales grâce à l'impression 3D. Elle crée ensuite 3DIMO, qui développe des solutions technologiques pour le suivi des animaux et l'agriculture. Reconnue pour ses réalisations, elle a reçu plusieurs prix dont le titre de \"meilleure femme innovatrice d'Afrique\".",
      size: "small",
      color: "blue",
      image: medic3DImg
    },
    {
      id: 6,
      title: "À la découverte de l’informatique quantique",
      bio: "Michelle Simmons, née en 1967 à Londres, est une physicienne et chercheuse australienne de renommée mondiale dans le domaine de l'informatique quantique. Elle est connue pour avoir créé le premier transistor constitué d'un seul atome, une avancée majeure vers les ordinateurs quantiques. Son travail lui a valu de nombreuses distinctions, dont le titre de \"Australian of the Year\" en 2018.",
      size: "large",
      color: "red",
      image: quantiqueImg
    },
    {
      id: 7,
      title: "La mathématicienne qui change l’histoire",
      bio: "Écoutez ce podcast fascinant sur Katherine Johnson et découvrez son histoire inspirante.",
      size: "medium",
      color: "pink",
      media: "audio",
      mediaSource: podcastFile,
      image: calculatriceImg
    },
    {
      id: 8,
      title: "Secrets et codes : la cryptologie moderne",
      bio: "Wang Xiaoyun, née en 1966 dans la province du Shandong en Chine, est une mathématicienne et cryptologue de renommée internationale. Elle est surtout connue pour avoir démontré que des algorithmes considérés sûrs, comme MD5 et SHA‑1, pouvaient être vulnérables, un travail qui a poussé le monde entier à revoir les standards de la cryptographie. Membre de l'Académie chinoise des sciences et lauréate du Future Science Prize.",
      size: "small",
      color: "yellow",
      image: cryptoImg
    }
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .card-grid-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%);
          padding: 40px 20px;
          font-family: 'Arial', sans-serif;
        }

        .grid-title {
          text-align: center;
          color: #FFD700;
          font-size: 2.5rem;
          margin-bottom: 40px;
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          letter-spacing: 2px;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        .card-wrapper {
          perspective: 1000px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .card-wrapper:hover {
          transform: scale(1.02);
        }

        .card-wrapper.small {
          grid-column: span 1;
          min-height: 280px;
        }

        .card-wrapper.medium {
          grid-column: span 1;
          min-height: 350px;
        }

        .card-wrapper.large {
          grid-column: span 2;
          min-height: 320px;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: inherit;
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .card.flipped {
          transform: rotateX(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .card-front {
          background: rgba(255, 255, 255, 0.95);
          border: 3px solid;
        }

        .card-front h2 {
          font-size: 1.4rem;
          text-align: center;
          margin-bottom: 20px;
          color: #1a1a2e;
          line-height: 1.3;
        }

        .card-icon {
          font-size: 4rem;
          animation: float 3s ease-in-out infinite;
        }

        .card-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          margin-top: 10px;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .card-back {
          background: rgba(30, 30, 46, 0.95);
          transform: rotateX(180deg);
          overflow-y: auto;
          border: 3px solid;
        }

        .card-back h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          text-align: center;
        }

        .text-container,
        .media-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .bio-text {
          text-align: center;
          line-height: 1.6;
          font-size: 0.9rem;
          color: #e0e0e0;
        }

        audio,
        video {
          width: 100%;
          max-width: 100%;
          margin: 15px 0;
          border-radius: 8px;
        }

        video {
          max-height: 180px;
          object-fit: cover;
        }

        .card-wrapper.yellow .card-front {
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-color: #FFD700;
        }

        .card-wrapper.yellow .card-front h2 {
          color: #1a1a2e;
        }

        .card-wrapper.yellow .card-back {
          background: linear-gradient(135deg, #B8860B 0%, #8B6914 100%);
          border-color: #FFD700;
        }

        .card-wrapper.yellow .card-back h3 {
          color: #FFD700;
        }

        .card-wrapper.blue .card-front {
          background: linear-gradient(135deg, #00CED1 0%, #1E90FF 100%);
          border-color: #00CED1;
        }

        .card-wrapper.blue .card-front h2 {
          color: #ffffff;
        }

        .card-wrapper.blue .card-back {
          background: linear-gradient(135deg, #004E6B 0%, #003854 100%);
          border-color: #00CED1;
        }

        .card-wrapper.blue .card-back h3 {
          color: #00CED1;
        }

        .card-wrapper.red .card-front {
          background: linear-gradient(135deg, #FF6B6B 0%, #EE5A6F 100%);
          border-color: #FF6B6B;
        }

        .card-wrapper.red .card-front h2 {
          color: #ffffff;
        }

        .card-wrapper.red .card-back {
          background: linear-gradient(135deg, #8B0000 0%, #6B0000 100%);
          border-color: #FF6B6B;
        }

        .card-wrapper.red .card-back h3 {
          color: #FF6B6B;
        }

        .card-wrapper.pink .card-front {
          background: linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%);
          border-color: #FFB6C1;
        }

        .card-wrapper.pink .card-front h2 {
          color: #1a1a2e;
        }

        .card-wrapper.pink .card-back {
          background: linear-gradient(135deg, #8B2252 0%, #6B1A3F 100%);
          border-color: #FFB6C1;
        }

        .card-wrapper.pink .card-back h3 {
          color: #FFB6C1;
        }

        @media (max-width: 768px) {
          .grid-title {
            font-size: 2rem;
          }

          .card-wrapper.large {
            grid-column: span 1;
          }

          .card-grid {
            grid-template-columns: 1fr;
          }

          .card-front h2 {
            font-size: 1.5rem;
          }

          .card-icon {
            font-size: 3rem;
          }

          .card-image {
            width: 120px;
            height: 120px;
          }
        }

        @media (max-width: 480px) {
          .card-grid-container {
            padding: 20px 10px;
          }

          .grid-title {
            font-size: 1.5rem;
          }

          .card-front,
          .card-back {
            padding: 20px;
          }

          .card-image {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>

      <div className="card-grid-container">
        <h1 className="grid-title">Femmes Pionnières du Numérique</h1>
        <div className="card-grid">
          {cards.map(card => (
            <div
              key={card.id}
              className={`card-wrapper ${card.size} ${card.color}`}
              onClick={() => toggleCard(card.id)}
            >
              <div className={`card ${flippedCards[card.id] ? 'flipped' : ''}`}>
                <div className="card-front">
                  <h2>{card.title}</h2>
                  {card.image ? (
                    <div className="card-image">
                      <img src={card.image} alt={card.title} />
                    </div>
                  ) : (
                    <div className="card-icon">👩‍💻</div>
                  )}
                </div>
                <div className="card-back">
                  {card.media === 'audio' ? (
                    <div className="media-container">
                      <h3>{card.title}</h3>
                      <audio controls onClick={(e) => e.stopPropagation()}>
                        <source src={card.mediaSource} type="audio/mp4" />
                        Votre navigateur ne supporte pas l'élément audio.
                      </audio>
                      <p className="bio-text">{card.bio}</p>
                    </div>
                  ) : card.media === 'video' ? (
                    <div className="media-container">
                      <h3>{card.title}</h3>
                      <video controls onClick={(e) => e.stopPropagation()}>
                        <source src={card.mediaSource} type="video/mp4" />
                        Votre navigateur ne supporte pas l'élément vidéo.
                      </video>
                      <p className="bio-text">{card.bio}</p>
                    </div>
                  ) : (
                    <div className="text-container">
                      <h3>{card.title}</h3>
                      <p className="bio-text">{card.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardGrid;