import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

const slides = [
    {
        imageUrl: "https://smns-games.com/wp-content/uploads/2019/08/gDEV5lZ5yeA.jpg",
        title: 'Акция в Global Student Center!',
        description: 'Купи два курса и получи третью за полную стоимость!'
    },
    {
        imageUrl: "https://www.ellucian.com/sites/default/files/styles/max_width_1920/public/uploads/images/2018/09/insights-article-meeting-students-expectations-for-a-digital-campus.jpg?itok=objiC9GM",
        title: 'Rocket Study разыгрывает скидки!',
        description: 'Отправь это 10 друзьям, похлопай в ладошки и посмотри под подушку! Там будет скидка.'
    }
];

export default function Carousel() {
    return(
        <div>
            <Slider>
                {slides.map((slide, index) =>
                    <div key={index}>
                        <div style={{
                            backgroundImage: 'url(' + slide.imageUrl + ')',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            height: '100%'
                        }}>
                            <div style={{
                                backgroundColor: '#00000082',
                                width: '100%',
                                height: '100%',
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '4%',
                                    left: '6%',
                                    zIndex: 8,
                                    color: '#fff'
                                }}>
                                    <h2 style={{
                                        fontSize: '36px',
                                        zIndex: 8
                                    }}>{slide.title}</h2>

                                    <p style={{
                                        fontSize: '22px'
                                    }}>{slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </Slider>
        </div>
    )
}