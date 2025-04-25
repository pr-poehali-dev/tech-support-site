
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

export function GameCard({ title, description, image, buttonText, link }: GameCardProps) {
  return (
    <Card className="overflow-hidden bg-[#1A1F2C] border border-[#333] hover:border-[#9b87f5] transition-all duration-300">
      <div className="aspect-video w-full relative">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#1A1F2C]/90"></div>
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{title}</h3>
      </div>
      <CardContent className="p-6">
        <p className="text-gray-300 mb-6">{description}</p>
        <Link to={link}>
          <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white">
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
