
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  linkText: string;
  count?: number;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  icon,
  linkTo,
  linkText,
  count
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
        {count !== undefined && (
          <div className="mt-4">
            <p className="text-3xl font-bold">{count}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate(linkTo)} className="w-full">
          {linkText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
