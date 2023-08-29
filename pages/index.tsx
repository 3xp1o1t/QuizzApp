import Header from '@/components/ui/Header';

type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col gap-8">
      <Header />
    </div>
  );
};

export default HomePage;
