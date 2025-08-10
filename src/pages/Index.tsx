import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  material: string;
  color: string;
  style: string;
}

const Index = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    material: '',
    color: '',
    style: ''
  });
  const [cartItems, setCartItems] = useState(0);

  const products: Product[] = [
    {
      id: 1,
      name: 'Серебряные минималистичные клипсы',
      price: 2990,
      image: '/img/548397fc-1c76-4699-8aba-68a9a3bb6d61.jpg',
      material: 'серебро',
      color: 'серебряный',
      style: 'минимализм'
    },
    {
      id: 2,
      name: 'Золотые геометрические клипсы',
      price: 4990,
      image: '/img/a40d0c46-399b-4064-afa6-347c7ca79b9e.jpg',
      material: 'золото',
      color: 'золотой',
      style: 'геометрия'
    },
    {
      id: 3,
      name: 'Розовое золото с жемчугом',
      price: 5990,
      image: '/img/042fa883-081f-4df0-88fc-3ce3e7726a3b.jpg',
      material: 'золото',
      color: 'розовый',
      style: 'классика'
    },
    {
      id: 4,
      name: 'Серебряные круглые клипсы',
      price: 3490,
      image: '/img/548397fc-1c76-4699-8aba-68a9a3bb6d61.jpg',
      material: 'серебро',
      color: 'серебряный',
      style: 'классика'
    },
    {
      id: 5,
      name: 'Золотые асимметричные клипсы',
      price: 6990,
      image: '/img/a40d0c46-399b-4064-afa6-347c7ca79b9e.jpg',
      material: 'золото',
      color: 'золотой',
      style: 'авангард'
    },
    {
      id: 6,
      name: 'Серебро с кристаллами',
      price: 3990,
      image: '/img/548397fc-1c76-4699-8aba-68a9a3bb6d61.jpg',
      material: 'серебро',
      color: 'серебряный',
      style: 'гламур'
    }
  ];

  const materials = ['серебро', 'золото'];
  const colors = ['серебряный', 'золотой', 'розовый'];
  const styles = ['минимализм', 'геометрия', 'классика', 'авангард', 'гламур'];

  const filteredProducts = products.filter(product => {
    return (
      (!selectedFilters.material || product.material === selectedFilters.material) &&
      (!selectedFilters.color || product.color === selectedFilters.color) &&
      (!selectedFilters.style || product.style === selectedFilters.style)
    );
  });

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const clearFilters = () => {
    setSelectedFilters({ material: '', color: '', style: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">КЛИПС</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Главная</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">О нас</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Доставка</a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Icon name="ShoppingBag" size={20} />
                {cartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-black text-white">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Элегантные клипсы
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Откройте для себя коллекцию изысканных клипс ручной работы. 
            Минималистичный дизайн для современной женщины.
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <h3 className="text-lg font-semibold text-black">Фильтры</h3>
            
            <div className="flex flex-wrap gap-4">
              {/* Material Filter */}
              <div className="flex gap-2">
                <span className="text-sm text-gray-600 self-center">Материал:</span>
                {materials.map(material => (
                  <Button
                    key={material}
                    variant={selectedFilters.material === material ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilters(prev => ({
                      ...prev,
                      material: prev.material === material ? '' : material
                    }))}
                    className={selectedFilters.material === material ? "bg-black text-white" : ""}
                  >
                    {material}
                  </Button>
                ))}
              </div>

              {/* Color Filter */}
              <div className="flex gap-2">
                <span className="text-sm text-gray-600 self-center">Цвет:</span>
                {colors.map(color => (
                  <Button
                    key={color}
                    variant={selectedFilters.color === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilters(prev => ({
                      ...prev,
                      color: prev.color === color ? '' : color
                    }))}
                    className={selectedFilters.color === color ? "bg-black text-white" : ""}
                  >
                    {color}
                  </Button>
                ))}
              </div>

              {/* Style Filter */}
              <div className="flex gap-2">
                <span className="text-sm text-gray-600 self-center">Стиль:</span>
                {styles.map(style => (
                  <Button
                    key={style}
                    variant={selectedFilters.style === style ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilters(prev => ({
                      ...prev,
                      style: prev.style === style ? '' : style
                    }))}
                    className={selectedFilters.style === style ? "bg-black text-white" : ""}
                  >
                    {style}
                  </Button>
                ))}
              </div>

              {/* Clear Filters */}
              {(selectedFilters.material || selectedFilters.color || selectedFilters.style) && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-600">
                  Очистить
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-gray-50 rounded-t-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-black mb-2">{product.name}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{product.material}</Badge>
                    <Badge variant="outline" className="text-xs">{product.color}</Badge>
                    <Badge variant="outline" className="text-xs">{product.style}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-black">{product.price.toLocaleString()} ₽</span>
                    <Button onClick={addToCart} className="bg-black text-white hover:bg-gray-800">
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">По выбранным фильтрам товары не найдены</p>
              <Button onClick={clearFilters} className="mt-4" variant="outline">
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black mb-6">О нас</h2>
            <p className="text-lg text-gray-600 mb-8">
              Мы создаем уникальные клипсы, которые подчеркивают индивидуальность каждой женщины. 
              Наши изделия изготавливаются вручную из качественных материалов с особым вниманием к деталям.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Crown" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">Премиум качество</h3>
                <p className="text-gray-600 text-sm">Только лучшие материалы и тщательная проверка качества</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">Быстрая доставка</h3>
                <p className="text-gray-600 text-sm">Доставляем по всей России в течение 1-3 дней</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">Гарантия</h3>
                <p className="text-gray-600 text-sm">Полная гарантия на все изделия сроком 2 года</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">КЛИПС</h3>
              <p className="text-gray-400 text-sm">
                Элегантные клипсы для современной женщины
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Каталог</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">О нас</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Доставка</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+7 (999) 123-45-67</p>
                <p>info@clips.ru</p>
                <p>Москва, ул. Тверская, 1</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 КЛИПС. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;