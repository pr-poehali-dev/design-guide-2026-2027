import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ContentItem {
  id: string;
  type: 'text' | 'image';
  content: string;
  fontSize?: string;
  fontWeight?: string;
  section: string;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [selectedSection, setSelectedSection] = useState('home');
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/login');
      return;
    }
    setMounted(true);
    loadContent();
  }, [user, navigate]);

  const loadContent = () => {
    const saved = localStorage.getItem('adminContent');
    if (saved) {
      setContentItems(JSON.parse(saved));
    }
  };

  const saveContent = (items: ContentItem[]) => {
    localStorage.setItem('adminContent', JSON.stringify(items));
    setContentItems(items);
    toast({
      title: 'Сохранено',
      description: 'Изменения успешно применены',
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newItem: ContentItem = {
        id: Date.now().toString(),
        type: 'image',
        content: event.target?.result as string,
        section: selectedSection,
      };
      saveContent([...contentItems, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const handleTextAdd = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Новый текстовый блок',
      fontSize: '16px',
      fontWeight: 'normal',
      section: selectedSection,
    };
    setEditingItem(newItem);
  };

  const handleTextSave = () => {
    if (!editingItem) return;

    const exists = contentItems.find((item) => item.id === editingItem.id);
    if (exists) {
      saveContent(
        contentItems.map((item) => (item.id === editingItem.id ? editingItem : item))
      );
    } else {
      saveContent([...contentItems, editingItem]);
    }
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    saveContent(contentItems.filter((item) => item.id !== id));
  };

  if (!user?.isAdmin) return null;

  const filteredItems = contentItems.filter((item) => item.section === selectedSection);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 animated-gradient -z-10" />

      <div className="relative z-10">
        <Navigation />

        <main className="container mx-auto px-4 py-12">
          <div
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="glass-effect p-8 rounded-3xl mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Админ-панель</h1>
                  <p className="opacity-80">Управление контентом сайта</p>
                </div>
                <Button onClick={() => navigate('/profile')} variant="outline" className="gap-2">
                  <Icon name="ArrowLeft" size={18} />
                  Назад
                </Button>
              </div>

              <div className="mb-6">
                <Label>Выберите раздел</Label>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="glass-effect mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Главная</SelectItem>
                    <SelectItem value="typography">Типографика</SelectItem>
                    <SelectItem value="composition">Композиция</SelectItem>
                    <SelectItem value="coloristics">Колористика</SelectItem>
                    <SelectItem value="card-styles">Стили карточек</SelectItem>
                    <SelectItem value="theory">Теория</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button className="gap-2">
                    <Icon name="Upload" size={18} />
                    Загрузить изображение
                  </Button>
                </div>
                <Button onClick={handleTextAdd} variant="outline" className="gap-2">
                  <Icon name="Plus" size={18} />
                  Добавить текст
                </Button>
              </div>
            </div>

            {editingItem && (
              <div className="glass-effect p-8 rounded-3xl mb-8">
                <h2 className="text-2xl font-bold mb-6">Редактирование текста</h2>
                <div className="space-y-4">
                  <div>
                    <Label>Содержание</Label>
                    <Textarea
                      value={editingItem.content}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, content: e.target.value })
                      }
                      className="glass-effect mt-2 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Размер шрифта</Label>
                      <Select
                        value={editingItem.fontSize}
                        onValueChange={(value) =>
                          setEditingItem({ ...editingItem, fontSize: value })
                        }
                      >
                        <SelectTrigger className="glass-effect mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12px">12px</SelectItem>
                          <SelectItem value="14px">14px</SelectItem>
                          <SelectItem value="16px">16px</SelectItem>
                          <SelectItem value="18px">18px</SelectItem>
                          <SelectItem value="20px">20px</SelectItem>
                          <SelectItem value="24px">24px</SelectItem>
                          <SelectItem value="32px">32px</SelectItem>
                          <SelectItem value="48px">48px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Начертание</Label>
                      <Select
                        value={editingItem.fontWeight}
                        onValueChange={(value) =>
                          setEditingItem({ ...editingItem, fontWeight: value })
                        }
                      >
                        <SelectTrigger className="glass-effect mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Обычный</SelectItem>
                          <SelectItem value="500">Средний</SelectItem>
                          <SelectItem value="600">Полужирный</SelectItem>
                          <SelectItem value="bold">Жирный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleTextSave} className="gap-2">
                      <Icon name="Check" size={18} />
                      Сохранить
                    </Button>
                    <Button
                      onClick={() => setEditingItem(null)}
                      variant="outline"
                      className="gap-2"
                    >
                      <Icon name="X" size={18} />
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-effect p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">
                Контент раздела: {selectedSection}
              </h2>

              {filteredItems.length === 0 ? (
                <p className="text-center py-12 opacity-60">
                  Нет добавленного контента в этом разделе
                </p>
              ) : (
                <div className="grid gap-6">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      {item.type === 'image' ? (
                        <div className="flex items-center gap-4">
                          <img
                            src={item.content}
                            alt="Uploaded"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold mb-2">Изображение</p>
                            <Button
                              onClick={() => handleDelete(item.id)}
                              variant="destructive"
                              size="sm"
                              className="gap-2"
                            >
                              <Icon name="Trash2" size={16} />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p
                            className="mb-4"
                            style={{
                              fontSize: item.fontSize,
                              fontWeight: item.fontWeight,
                            }}
                          >
                            {item.content}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => setEditingItem(item)}
                              variant="outline"
                              size="sm"
                              className="gap-2"
                            >
                              <Icon name="Edit" size={16} />
                              Редактировать
                            </Button>
                            <Button
                              onClick={() => handleDelete(item.id)}
                              variant="destructive"
                              size="sm"
                              className="gap-2"
                            >
                              <Icon name="Trash2" size={16} />
                              Удалить
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
