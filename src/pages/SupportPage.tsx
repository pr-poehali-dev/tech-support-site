
import { useState } from "react";
import { MainNav } from "@/components/MainNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь будет отправка данных формы
    alert("Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1F2C]">
      <MainNav />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-white">Техническая поддержка</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-white">Часто задаваемые вопросы</h2>
            
            <Accordion type="single" collapsible className="bg-[#222632] rounded-lg">
              <AccordionItem value="item-1" className="border-[#333]">
                <AccordionTrigger className="px-4 text-white hover:text-[#9b87f5]">
                  Как начать играть в режиме Crash?
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-300">
                  Чтобы начать игру в режиме Crash, необходимо зарегистрироваться, пополнить баланс и выбрать скины или сумму для ставки. Затем определите коэффициент выхода и ждите результата.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border-[#333]">
                <AccordionTrigger className="px-4 text-white hover:text-[#9b87f5]">
                  Как работает режим Upgrade?
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-300">
                  В режиме Upgrade вы выбираете скин для улучшения и целевой скин, который хотите получить. Система показывает шанс на успех, и вы решаете, стоит ли рисковать.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border-[#333]">
                <AccordionTrigger className="px-4 text-white hover:text-[#9b87f5]">
                  Как вывести выигрыш?
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-300">
                  Вывод выигрыша доступен через личный кабинет. Выберите способ вывода, укажите необходимые данные и подтвердите операцию. Вывод обрабатывается в течение 24 часов.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <Card className="bg-[#222632] border-[#333]">
              <CardHeader>
                <CardTitle className="text-white">Связаться с поддержкой</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Имя
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                      className="bg-[#1A1F2C] border-[#333] text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Введите ваш email"
                      required
                      className="bg-[#1A1F2C] border-[#333] text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Сообщение
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Опишите вашу проблему или вопрос"
                      required
                      className="min-h-[120px] bg-[#1A1F2C] border-[#333] text-white"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupportPage;
