
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";
import { GameCard } from "@/components/GameCard";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleStartGameClick = () => {
    navigate('/cases');
  };

  const handleHowItWorksClick = () => {
    navigate('/support');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Испытай удачу на <span className="text-[#9b87f5]">CSCase</span>
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Открывай кейсы CS:GO, играй в Crash и Upgrade режимах, выигрывай лучшие скины и получай мгновенную поддержку!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg"
                onClick={handleStartGameClick}
              >
                Начать игру
              </Button>
              <Button 
                variant="outline" 
                className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 px-8 py-6 text-lg"
                onClick={handleHowItWorksClick}
              >
                Как это работает
              </Button>
            </div>
          </div>
        </section>

        {/* Game Modes Section */}
        <section className="py-16 px-4 md:px-6 bg-[#222632]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Выбери свой режим игры</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <GameCard 
                title="Кейсы CS:GO" 
                description="Открывай кейсы и получай редкие скины разной стоимости с невероятными шансами на выигрыш!"
                image="https://images.unsplash.com/photo-1559583109-3e7968136c99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                buttonText="Открыть кейсы"
                link="/cases"
              />
              
              <GameCard 
                title="Crash" 
                description="Поставь свои скины и деньги, определи момент выхода и забери выигрыш до краха графика!"
                image="https://images.unsplash.com/photo-1604782206219-3b9d5f70853f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                buttonText="Играть в Crash"
                link="/crash"
              />
              
              <GameCard 
                title="Upgrade" 
                description="Улучшай свои скины с шансом выиграть предметы гораздо более высокой стоимости!"
                image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                buttonText="Играть в Upgrade"
                link="/upgrade"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Наши преимущества</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#222632] p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold mb-3 text-white">Честная игра</h3>
                <p className="text-gray-300">Прозрачные механики и честная система, проверенная тысячами игроков</p>
              </div>
              
              <div className="bg-[#222632] p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-3 text-white">Безопасность</h3>
                <p className="text-gray-300">Защита данных и безопасные транзакции под надежной защитой</p>
              </div>
              
              <div className="bg-[#222632] p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold mb-3 text-white">Поддержка 24/7</h3>
                <p className="text-gray-300">Наша команда всегда готова помочь с любым вопросом или проблемой</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
