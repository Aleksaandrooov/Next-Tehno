import { CartInfo } from '@/components/shared/About-us/cart-info';
import { Container } from '@/components/shared/container';
import { aboutUsArray } from '@/lib/Arrays/aboutUsArray';

export default function AboutPage() {
  return (
    <div className="my-14 w-full max-md:my-8">
      <Container className="max-md:px-2">
        <h1 className="text-2xl">Наши контакты</h1>
        <div className="grid grid-cols-3 max-md:gap-3 max-md:grid-cols-1 mt-10 gap-5 max-md:mt-5">
          {aboutUsArray.map((obj, i) => (
            <CartInfo key={i} {...obj} />
          ))}
        </div>
        <iframe
          className="w-full h-[600px] mt-5 rounded-2xl max-md:h-[400px] max-sm:h-[250px]"
          src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3A2a0a1494350a0ff420ac6e4a0dd1a9ab1cc2a18040e73c6fc21fd2c256a84a52"
        />
      </Container>
    </div>
  );
}
