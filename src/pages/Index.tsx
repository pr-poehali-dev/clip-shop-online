import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  material: string;
  size: string;
  mountingLocation: string;
  carModel: string;
  description: string;
  articleNumber?: string;
  weight?: string;
  compatibility?: string[];
  installationMethod?: string;
  warranty?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedFilters, setSelectedFilters] = useState({
    material: '',
    size: '',
    mountingLocation: '',
    carModel: ''
  });
  const [cartItems, setCartItems] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({ username: '', password: '' });
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Клипса панели BMW X5',
      price: 450,
      image: '/img/40c5cf86-6259-422a-9b9c-88c3512eb539.jpg',
      material: 'пластик',
      size: '10мм',
      mountingLocation: 'панель приборов',
      carModel: 'BMW X5',
      description: 'Оригинальная клипса для панели приборов BMW X5',
      articleNumber: 'BMW-X5-001',
      weight: '5г',
      compatibility: ['BMW X5 E70 (2006-2013)', 'BMW X5 F15 (2013-2018)'],
      installationMethod: 'Вставить до щелчка',
      warranty: '12 месяцев'
    },
    {
      id: 2,
      name: 'Клипса двери Mercedes C-Class',
      price: 320,
      image: '/img/40c5cf86-6259-422a-9b9c-88c3512eb539.jpg',
      material: 'металл',
      size: '8мм',
      mountingLocation: 'дверная панель',
      carModel: 'Mercedes C-Class',
      description: 'Металлическая клипса для дверных панелей Mercedes',
      articleNumber: 'MB-C-002',
      weight: '8г',
      compatibility: ['Mercedes C-Class W204', 'Mercedes C-Class W205'],
      installationMethod: 'Закрутить отверткой',
      warranty: '24 месяца'
    },
    {
      id: 3,
      name: 'Клипса обшивки Toyota Camry',
      price: 180,
      image: '/img/b4072b2e-8f83-4f2a-9c00-6ca2050a1448.jpg',
      material: 'пластик',
      size: '12мм',
      mountingLocation: 'обшивка салона',
      carModel: 'Toyota Camry',
      description: 'Пластиковая клипса для обшивки салона Toyota Camry'
    },
    {
      id: 4,
      name: 'Универсальная клипса 6мм',
      price: 95,
      image: '/img/2a4b8078-225d-4045-b577-e79943ced909.jpg',
      material: 'пластик',
      size: '6мм',
      mountingLocation: 'универсальная',
      carModel: 'универсальная',
      description: 'Универсальная пластиковая клипса для различных креплений'
    },
    {
      id: 5,
      name: 'Клипса багажника Audi A4',
      price: 380,
      image: '/img/40c5cf86-6259-422a-9b9c-88c3512eb539.jpg',
      material: 'металл',
      size: '15мм',
      mountingLocation: 'багажник',
      carModel: 'Audi A4',
      description: 'Металлическая клипса для обшивки багажника Audi A4'
    },
    {
      id: 6,
      name: 'Клипса капота Honda Civic',
      price: 220,
      image: '/img/2a4b8078-225d-4045-b577-e79943ced909.jpg',
      material: 'пластик',
      size: '9мм',
      mountingLocation: 'капот',
      carModel: 'Honda Civic',
      description: 'Пластиковая клипса для крепления обшивки капота'
    }
  ]);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    material: '',
    size: '',
    mountingLocation: '',
    carModel: '',
    description: '',
    image: '/img/2a4b8078-225d-4045-b577-e79943ced909.jpg'
  });

  const materials = ['пластик', 'металл', 'композит'];
  const sizes = ['6мм', '8мм', '9мм', '10мм', '12мм', '15мм', '20мм'];
  const mountingLocations = ['панель приборов', 'дверная панель', 'обшивка салона', 'багажник', 'капот', 'универсальная'];
  const carModels = ['BMW X5', 'Mercedes C-Class', 'Toyota Camry', 'Audi A4', 'Honda Civic', 'Volkswagen Golf', 'универсальная'];

  const filteredProducts = products.filter(product => {
    return (
      (!selectedFilters.material || product.material === selectedFilters.material) &&
      (!selectedFilters.size || product.size === selectedFilters.size) &&
      (!selectedFilters.mountingLocation || product.mountingLocation === selectedFilters.mountingLocation) &&
      (!selectedFilters.carModel || product.carModel === selectedFilters.carModel)
    );
  });

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  const clearFilters = () => {
    setSelectedFilters({ material: '', size: '', mountingLocation: '', carModel: '' });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: parseInt(newProduct.price),
        material: newProduct.material || 'пластик',
        size: newProduct.size || '6мм',
        mountingLocation: newProduct.mountingLocation || 'универсальная',
        carModel: newProduct.carModel || 'универсальная',
        description: newProduct.description,
        image: newProduct.image
      };
      setProducts(prev => [...prev, product]);
      setNewProduct({
        name: '',
        price: '',
        material: '',
        size: '',
        mountingLocation: '',
        carModel: '',
        description: '',
        image: '/img/2a4b8078-225d-4045-b577-e79943ced909.jpg'
      });
    }
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleLogin = () => {
    // Простая авторизация для демонстрации
    if (loginCredentials.username === 'admin' && loginCredentials.password === 'admin123') {
      setIsAdmin(true);
      setIsLoginDialogOpen(false);
      setActiveTab('admin');
      setLoginCredentials({ username: '', password: '' });
    } else {
      alert('Неправильный логин или пароль');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setActiveTab('catalog');
  };

  const handleAdminAccess = () => {
    if (isAdmin) {
      setActiveTab('admin');
    } else {
      setIsLoginDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">АвтоКлипс</h1>
              <nav className="hidden md:flex space-x-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab('catalog')}
                  className={activeTab === 'catalog' ? 'text-black' : 'text-gray-600'}
                >
                  Каталог
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleAdminAccess}
                  className={activeTab === 'admin' ? 'text-black' : 'text-gray-600'}
                >
                  Админ-панель
                </Button>
                <a href="#about" className="text-gray-600 hover:text-black transition-colors">О нас</a>
                <a href="#contacts" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600">
                  Выйти
                </Button>
              )}
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Catalog Tab */}
        <TabsContent value="catalog">
          {/* Hero Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
                Автомобильные клипсы
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Качественные крепежные элементы для вашего автомобиля. 
                Широкий выбор клипс для всех марок и моделей.
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

                  {/* Size Filter */}
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 self-center">Размер:</span>
                    {sizes.map(size => (
                      <Button
                        key={size}
                        variant={selectedFilters.size === size ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilters(prev => ({
                          ...prev,
                          size: prev.size === size ? '' : size
                        }))}
                        className={selectedFilters.size === size ? "bg-black text-white" : ""}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>

                  {/* Mounting Location Filter */}
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 self-center">Место крепления:</span>
                    {mountingLocations.map(location => (
                      <Button
                        key={location}
                        variant={selectedFilters.mountingLocation === location ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilters(prev => ({
                          ...prev,
                          mountingLocation: prev.mountingLocation === location ? '' : location
                        }))}
                        className={selectedFilters.mountingLocation === location ? "bg-black text-white" : ""}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>

                  {/* Car Model Filter */}
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600 self-center">Модель авто:</span>
                    {carModels.map(model => (
                      <Button
                        key={model}
                        variant={selectedFilters.carModel === model ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilters(prev => ({
                          ...prev,
                          carModel: prev.carModel === model ? '' : model
                        }))}
                        className={selectedFilters.carModel === model ? "bg-black text-white" : ""}
                      >
                        {model}
                      </Button>
                    ))}
                  </div>

                  {/* Clear Filters */}
                  {(selectedFilters.material || selectedFilters.size || selectedFilters.mountingLocation || selectedFilters.carModel) && (
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
                    <div className="aspect-square overflow-hidden bg-gray-50 rounded-t-lg" onClick={() => openProductDetails(product)}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg text-black mb-2 cursor-pointer" onClick={() => openProductDetails(product)}>{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        <Badge variant="outline" className="text-xs">{product.material}</Badge>
                        <Badge variant="outline" className="text-xs">{product.size}</Badge>
                        <Badge variant="outline" className="text-xs">{product.mountingLocation}</Badge>
                        <Badge variant="outline" className="text-xs">{product.carModel}</Badge>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xl font-bold text-black">{product.price} ₽</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => openProductDetails(product)}>
                            Подробнее
                          </Button>
                          <Button onClick={addToCart} className="bg-black text-white hover:bg-gray-800" size="sm">
                            В корзину
                          </Button>
                        </div>
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
        </TabsContent>

        {/* Admin Panel Tab */}
        <TabsContent value="admin">
          {!isAdmin ? (
            <div className="py-20 text-center">
              <h2 className="text-3xl font-bold text-black mb-4">Доступ запрещен</h2>
              <p className="text-gray-600 mb-8">Для доступа к админ-панели необходимо войти в систему</p>
              <Button onClick={() => setIsLoginDialogOpen(true)} className="bg-black text-white hover:bg-gray-800">
                Войти
              </Button>
            </div>
          ) : (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-black">Админ-панель</h2>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Авторизован
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Add Product Form */}
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">Добавить товар</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Название товара</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                          placeholder="Название клипсы"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="price">Цена (₽)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({...prev, price: e.target.value}))}
                          placeholder="450"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="material">Материал</Label>
                          <select 
                            id="material"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={newProduct.material}
                            onChange={(e) => setNewProduct(prev => ({...prev, material: e.target.value}))}
                          >
                            <option value="">Выберите материал</option>
                            {materials.map(material => (
                              <option key={material} value={material}>{material}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <Label htmlFor="size">Размер</Label>
                          <select 
                            id="size"
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            value={newProduct.size}
                            onChange={(e) => setNewProduct(prev => ({...prev, size: e.target.value}))}
                          >
                            <option value="">Выберите размер</option>
                            {sizes.map(size => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="mountingLocation">Место крепления</Label>
                        <select 
                          id="mountingLocation"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          value={newProduct.mountingLocation}
                          onChange={(e) => setNewProduct(prev => ({...prev, mountingLocation: e.target.value}))}
                        >
                          <option value="">Выберите место крепления</option>
                          {mountingLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="carModel">Модель автомобиля</Label>
                        <select 
                          id="carModel"
                          className="w-full border border-gray-300 rounded-md px-3 py-2"
                          value={newProduct.carModel}
                          onChange={(e) => setNewProduct(prev => ({...prev, carModel: e.target.value}))}
                        >
                          <option value="">Выберите модель</option>
                          {carModels.map(model => (
                            <option key={model} value={model}>{model}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Описание</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                          placeholder="Описание товара..."
                          rows={3}
                        />
                      </div>
                      
                      <Button onClick={addProduct} className="w-full bg-black text-white hover:bg-gray-800">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить товар
                      </Button>
                    </div>
                  </Card>

                  {/* Products Management */}
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-4">Управление товарами</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {products.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{product.name}</h4>
                            <p className="text-xs text-gray-600">{product.price} ₽ • {product.material} • {product.size}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      Всего товаров: {products.length}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          )}
        </TabsContent>
      </Tabs>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black mb-6">О нас</h2>
            <p className="text-lg text-gray-600 mb-8">
              Мы специализируемся на поставке качественных автомобильных клипс и крепежных элементов. 
              Наш ассортимент включает оригинальные и совместимые запчасти для всех популярных марок автомобилей.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Car" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">Для всех марок</h3>
                <p className="text-gray-600 text-sm">Клипсы для BMW, Mercedes, Toyota, Audi и других марок</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">Быстрая доставка</h3>
                <p className="text-gray-600 text-sm">Отправка в день заказа по всей России</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-black mb-2">Качество</h3>
                <p className="text-gray-600 text-sm">Только оригинальные и проверенные аналоги</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">АвтоКлипс</h3>
              <p className="text-gray-400 text-sm">
                Качественные крепежные элементы для вашего автомобиля
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors block">Каталог</a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors block">О нас</a>
                <a href="#contacts" className="text-gray-400 hover:text-white transition-colors block">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+7 (999) 123-45-67</p>
                <p>info@avtoclips.ru</p>
                <p>Москва, ул. Автозаводская, 15</p>
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
            <p>&copy; 2024 АвтоКлипс. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Product Details Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg bg-gray-50"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{selectedProduct.name}</h3>
                    <p className="text-3xl font-bold text-black">{selectedProduct.price} ₽</p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{selectedProduct.material}</Badge>
                    <Badge variant="outline">{selectedProduct.size}</Badge>
                    <Badge variant="outline">{selectedProduct.mountingLocation}</Badge>
                    <Badge variant="outline">{selectedProduct.carModel}</Badge>
                  </div>
                  
                  <Button onClick={addToCart} className="w-full bg-black text-white hover:bg-gray-800">
                    Добавить в корзину
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Описание</h4>
                  <p className="text-gray-600">{selectedProduct.description}</p>
                </div>
                
                {selectedProduct.articleNumber && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Технические характеристики</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Артикул:</span>
                          <span className="font-mono">{selectedProduct.articleNumber}</span>
                        </div>
                        {selectedProduct.weight && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Вес:</span>
                            <span>{selectedProduct.weight}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Материал:</span>
                          <span>{selectedProduct.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Размер:</span>
                          <span>{selectedProduct.size}</span>
                        </div>
                        {selectedProduct.warranty && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Гарантия:</span>
                            <span>{selectedProduct.warranty}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      {selectedProduct.compatibility && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Совместимость</h4>
                          <div className="space-y-1 text-sm">
                            {selectedProduct.compatibility.map((model, index) => (
                              <div key={index} className="text-gray-600">• {model}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedProduct.installationMethod && (
                        <div>
                          <h4 className="font-semibold mb-2">Монтаж</h4>
                          <p className="text-sm text-gray-600">{selectedProduct.installationMethod}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Вход в админ-панель</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                value={loginCredentials.username}
                onChange={(e) => setLoginCredentials(prev => ({...prev, username: e.target.value}))}
                placeholder="Введите логин"
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials(prev => ({...prev, password: e.target.value}))}
                placeholder="Введите пароль"
              />
            </div>
            <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
              Демо данные:<br/>
              Логин: <code>admin</code><br/>
              Пароль: <code>admin123</code>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsLoginDialogOpen(false)} variant="outline" className="flex-1">
                Отмена
              </Button>
              <Button onClick={handleLogin} className="flex-1 bg-black text-white hover:bg-gray-800">
                Войти
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Index;