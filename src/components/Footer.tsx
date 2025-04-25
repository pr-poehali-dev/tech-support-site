
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#222632] border-t border-[#333] py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">GamingCase</h3>
            <p className="text-gray-400">
              Лучшая платформа для игры в режимах Crash и Upgrade с поддержкой 24/7.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Режимы</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/crash" className="text-gray-400 hover:text-[#9b87f5]">
                  Crash
                </Link>
              </li>
              <li>
                <Link to="/upgrade" className="text-gray-400 hover:text-[#9b87f5]">
                  Upgrade
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Поддержка</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-[#9b87f5]">
                  Помощь
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#9b87f5]">
                  Часто задаваемые вопросы
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-[#9b87f5]">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-[#9b87f5]">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-[#333] text-center text-gray-400">
          <p>© {new Date().getFullYear()} GamingCase. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
