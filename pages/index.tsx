import Newsletter from '@/components/newsletter';
import Hero from '@/components/hero';
import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';
import Stats from '@/components/facts';
import Intro from '@/components/intro';
import Cards1 from '@/components/cards1';
import Cards2 from '@/components/cards2';
import menuData from '@/components/menudata';

const Home: React.FC = () => {
  const esteticaMenu = menuData.find((menu) => menu.title === 'Medicina Estética');
  const esteticaData = esteticaMenu ? esteticaMenu.submenu : [];

  const antiagingMenu = menuData.find((menu) => menu.title === 'Medicina Anti-Aging');
  const antiagingData = antiagingMenu ? antiagingMenu.submenu : [];

  return (
    <>
      <RootLayout>
        <DefaultLayout>
          <Hero />
          <Intro />
          <Cards1 services={esteticaData} />
          <Cards2 services={antiagingData} />
          <Stats />
   
          <Newsletter />
        </DefaultLayout>
      </RootLayout>
    </>
  );
};

export default Home;