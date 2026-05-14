// Prices ×1.6 (farm premium). Images are local generated presentation assets.
const IMG = () => '/assets/farm-catalog.png'

export const CATEGORIES = ['Овощи', 'Фрукты', 'Зелень', 'Сезонные наборы']

const desc = (name, extra) =>
  `Свежий фермерский продукт с собственных полей. ${extra} Доставляем в течение 24–48 часов с сохранением холодовой цепи.`

export const PRODUCTS = {
  Овощи: [
    { id: 'v1', name: 'Картофель молодой', price: 7.2, unit: 'кг', weight: '1 кг', img: IMG('1597362925123-77861d3facaf'), badge: null, description: desc('Картофель молодой', 'Выращен без химии, идеален для варки и запекания. Сорт «Скарб» — золотистая мякоть, рассыпчатый.') },
    { id: 'v2', name: 'Морковь столовая', price: 6.1, unit: 'кг', weight: '1 кг', img: IMG('1576045057992-4f64f3d9a5f2'), badge: 'Хит', description: desc('Морковь', 'Сладкая, сочная. Подходит для соков, салатов и горячих блюд. Хранится до 2 недель в холодильнике.') },
    { id: 'v3', name: 'Свёкла', price: 5.1, unit: 'кг', weight: '1 кг', img: IMG('1566385101042-1a0f0ddbd8df'), badge: null, description: desc('Свёкла', 'Тёмно-бордовая, без волокон. Идеальна для борща, винегрета и запекания.') },
    { id: 'v4', name: 'Томаты черри', price: 20, unit: 'кг', weight: '1 кг', img: IMG('1595855759920-86582356756'), badge: 'Премиум', description: desc('Томаты черри', 'Мини-томаты с насыщенным вкусом. Для салатов, закусок и украшения блюд.') },
    { id: 'v5', name: 'Огурцы грунтовые', price: 9.4, unit: 'кг', weight: '1 кг', img: IMG('1610832958506-aa56368176cf'), badge: null, description: desc('Огурцы', 'Хрустящие, ароматные. Без горечи. Для салатов и засолки.') },
    { id: 'v6', name: 'Капуста белокочанная', price: 4.5, unit: 'кг', weight: '1 кг', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Капуста', 'Плотные кочаны. Для борща, голубцов, квашения и салатов.') },
    { id: 'v7', name: 'Лук репчатый', price: 4, unit: 'кг', weight: '1 кг', img: IMG('1518843875459-f738682238a6'), badge: null, description: desc('Лук', 'Жёлтый лук, острый. Хранится долго в прохладном месте.') },
    { id: 'v8', name: 'Перец болгарский', price: 14.2, unit: 'кг', weight: '1 кг', img: IMG('1597362925123-77861d3facaf'), badge: null, description: desc('Перец', 'Сладкий, мясистый. Красный и жёлтый. Для фарширования и салатов.') },
    { id: 'v9', name: 'Кабачки', price: 6.7, unit: 'кг', weight: '1 кг', img: IMG('1576045057992-4f64f3d9a5f2'), badge: 'Сезон', description: desc('Кабачки', 'Молодые, нежные. Для икры, оладий и гриля.') },
    { id: 'v10', name: 'Баклажаны', price: 12, unit: 'кг', weight: '1 кг', img: IMG('1566385101042-1a0f0ddbd8df'), badge: null, description: desc('Баклажаны', 'Фиолетовые, без горечи. Для рагу, запекания и икры.') },
    { id: 'v11', name: 'Тыква мускатная', price: 8.8, unit: 'кг', weight: '1 кг', img: IMG('1595855759920-86582356756'), badge: 'Осень', description: desc('Тыква', 'Сладкая мякоть. Для супов, каш и десертов.') },
    { id: 'v12', name: 'Чеснок', price: 15.8, unit: 'кг', weight: '1 кг', img: IMG('1610832958506-aa56368176cf'), badge: null, description: desc('Чеснок', 'Острый, ароматный. Белорусский сорт. Для соусов и маринадов.') },
  ],
  Фрукты: [
    { id: 'f1', name: 'Яблоки Голден', price: 8.8, unit: 'кг', weight: '1 кг', img: IMG('1619566636858-adf3ef46400b'), badge: null, description: desc('Яблоки Голден', 'Сладкие, хрустящие. Идеальны для перекуса и выпечки.') },
    { id: 'f2', name: 'Груши Конференц', price: 11.5, unit: 'кг', weight: '1 кг', img: IMG('1599599810769-bcde5a160d32'), badge: 'Хит', description: desc('Груши', 'Сочные, сладкие. Для десертов и компотов.') },
    { id: 'f3', name: 'Сливы венгерка', price: 10.9, unit: 'кг', weight: '1 кг', img: IMG('1619566636858-adf3ef46400b'), badge: 'Сезон', description: desc('Сливы', 'Тёмные, сладкие. Для варенья и выпечки.') },
    { id: 'f4', name: 'Виноград кишмиш', price: 23.8, unit: 'кг', weight: '1 кг', img: IMG('1599599810769-bcde5a160d32'), badge: 'Премиум', description: desc('Виноград', 'Без косточек, сладкий. Для перекуса и соков.') },
    { id: 'f5', name: 'Апельсины', price: 13.6, unit: 'кг', weight: '1 кг', img: IMG('1619566636858-adf3ef46400b'), badge: null, description: desc('Апельсины', 'Сочные, витаминные. Импорт от проверенных поставщиков.') },
    { id: 'f6', name: 'Бананы', price: 7.8, unit: 'кг', weight: '1 кг', img: IMG('1599599810769-bcde5a160d32'), badge: null, description: desc('Бананы', 'Спелые, сладкие. Для смузи и перекуса.') },
    { id: 'f7', name: 'Киви', price: 18.4, unit: 'кг', weight: '1 кг', img: IMG('1619566636858-adf3ef46400b'), badge: null, description: desc('Киви', 'Зелёные, кисло-сладкие. Богаты витамином C.') },
    { id: 'f8', name: 'Мандарины', price: 15.8, unit: 'кг', weight: '1 кг', img: IMG('1599599810769-bcde5a160d32'), badge: null, description: desc('Мандарины', 'Сладкие, легко чистить. Сезонный продукт.') },
    { id: 'f9', name: 'Черешня', price: 29.6, unit: 'кг', weight: '1 кг', img: IMG('1619566636858-adf3ef46400b'), badge: 'Топ', description: desc('Черешня', 'Крупная, сладкая. Сезон 2–3 недели.') },
    { id: 'f10', name: 'Клубника', price: 35.2, unit: 'кг', weight: '1 кг', img: IMG('1599599810769-bcde5a160d32'), badge: 'Топ', description: desc('Клубника', 'Ароматная, сладкая. С белорусских плантаций.') },
    { id: 'f11', name: 'Черника', price: 31.8, unit: 'кг', weight: '1 кг', img: IMG('1619566636858-adf3ef46400b'), badge: 'Сезон', description: desc('Черника', 'Лесная и садовая. Для пирогов и смузи.') },
    { id: 'f12', name: 'Арбуз', price: 5.6, unit: 'кг', weight: '1 кг', img: IMG('1599599810769-bcde5a160d32'), badge: 'Лето', description: desc('Арбуз', 'Сладкий, сочный. Поштучно от 4 кг.') },
  ],
  Зелень: [
    { id: 'g1', name: 'Петрушка пучок', price: 4.6, unit: 'пучок', weight: '~50 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Петрушка', 'Свежая, ароматная. Для супов и салатов.') },
    { id: 'g2', name: 'Укроп пучок', price: 4, unit: 'пучок', weight: '~50 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Укроп', 'Ароматный. Для засолки и салатов.') },
    { id: 'g3', name: 'Зелёный лук', price: 5.1, unit: 'пучок', weight: '~80 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Зелёный лук', 'Острый, свежий. Для окрошки и яичницы.') },
    { id: 'g4', name: 'Салат Айсберг', price: 10.4, unit: 'шт', weight: '~400 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Айсберг', 'Хрустящий кочан. Для салатов и бургеров.') },
    { id: 'g5', name: 'Руккола', price: 14.2, unit: '100 г', weight: '100 г', img: IMG('1540420773420-3366772f3694'), badge: 'Премиум', description: desc('Руккола', 'Ореховый вкус. Для итальянских салатов.') },
    { id: 'g6', name: 'Шпинат', price: 12, unit: '200 г', weight: '200 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Шпинат', 'Нежный, полезный. Для смузи и горячих блюд.') },
    { id: 'g7', name: 'Базилик', price: 8.8, unit: 'пучок', weight: '~30 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Базилик', 'Ароматный. Для пасты и салатов.') },
    { id: 'g8', name: 'Кинза', price: 7.8, unit: 'пучок', weight: '~40 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Кинза', 'Пряная. Для азиатских блюд и салатов.') },
    { id: 'g9', name: 'Мята', price: 6.7, unit: 'пучок', weight: '~25 г', img: IMG('1540420773420-3366772f3694'), badge: null, description: desc('Мята', 'Ароматная. Для чая и десертов.') },
    { id: 'g10', name: 'Микс салатов', price: 15.8, unit: '200 г', weight: '200 г', img: IMG('1540420773420-3366772f3694'), badge: 'Хит', description: desc('Микс салатов', 'Руккола, латук, фризе. Готовый салат.') },
  ],
  'Сезонные наборы': [
    { id: 's1', name: 'Фермерский набор «Неделя»', price: 143.8, unit: 'набор', weight: '~8 кг', img: IMG('1597362925123-77861d3facaf'), badge: 'Хит', description: 'Сбалансированный набор овощей и фруктов на неделю для семьи из 3–4 человек. Картофель, морковь, свёкла, томаты, огурцы, лук, зелень, яблоки. Всё свежее, с фермы.' },
    { id: 's2', name: 'Премиум «Топ урожай»', price: 303.8, unit: 'набор', weight: '~12 кг', img: IMG('1619566636858-adf3ef46400b'), badge: 'Топ продукт', description: 'Эксклюзивный набор: томаты черри, перец, авокадо, ягоды, микрогрин, руккола, фрукты премиум. 15+ позиций. Для особых случаев.' },
    { id: 's3', name: 'Гриль-набор', price: 127.8, unit: 'набор', weight: '~5 кг', img: IMG('1576045057992-4f64f3d9a5f2'), badge: 'Сезон', description: 'Кабачки, баклажаны, перец, кукуруза, томаты. Всё для летнего гриля и шашлыков.' },
    { id: 's4', name: 'Осенний сбор', price: 159.8, unit: 'набор', weight: '~10 кг', img: IMG('1566385101042-1a0f0ddbd8df'), badge: null, description: 'Тыква, корнеплоды, капуста, лук. Идеально для супов и запекания. Сезонный набор.' },
    { id: 's5', name: 'Vitamin Boost', price: 207.8, unit: 'набор', weight: '~6 кг', img: IMG('1599599810769-bcde5a160d32'), badge: 'Премиум', description: 'Цитрусы, киви, ягоды, зелень. Для свежевыжатых соков и смузи. Укрепление иммунитета.' },
    { id: 's6', name: 'Шеф-набор для ресторана', price: 399.8, unit: 'набор', weight: 'индивидуально', img: IMG('1597362925123-77861d3facaf'), badge: 'B2B', description: 'Индивидуальный набор для HoReCa. Согласуем состав и объём под ваше меню. Документы и доставка по графику.' },
  ],
}

const positions = ['20% 50%', '42% 48%', '64% 50%', '78% 52%', '35% 38%', '58% 60%']

const visual = (query, fallback, index = 0) => ({
  img: '/assets/farm-catalog.png',
  fallback,
  imagePosition: positions[index % positions.length],
})

const PRODUCT_VISUALS = {
  v1: visual('young potatoes farm', 'from-yellow-700 via-amber-700 to-stone-700', 0),
  v2: visual('fresh carrots market', 'from-orange-700 via-amber-600 to-lime-700', 1),
  v3: visual('beetroot fresh vegetables', 'from-rose-900 via-red-800 to-stone-700', 2),
  v4: visual('cherry tomatoes fresh', 'from-red-800 via-orange-700 to-lime-700', 3),
  v5: visual('fresh cucumbers', 'from-emerald-800 via-lime-700 to-stone-700', 4),
  v6: visual('white cabbage farm', 'from-lime-800 via-emerald-700 to-stone-700', 5),
  v7: visual('yellow onions market', 'from-amber-800 via-yellow-700 to-stone-700', 0),
  v8: visual('bell peppers fresh', 'from-red-800 via-amber-700 to-lime-700', 1),
  v9: visual('zucchini fresh vegetables', 'from-lime-800 via-emerald-700 to-stone-700', 2),
  v10: visual('eggplant vegetables', 'from-purple-900 via-violet-800 to-stone-800', 3),
  v11: visual('butternut pumpkin', 'from-orange-800 via-amber-700 to-stone-700', 4),
  v12: visual('garlic bulbs', 'from-stone-700 via-zinc-600 to-amber-700', 5),
  f1: visual('golden apples orchard', 'from-yellow-700 via-lime-700 to-emerald-800', 0),
  f2: visual('conference pears', 'from-lime-800 via-yellow-700 to-stone-700', 1),
  f3: visual('fresh plums', 'from-purple-900 via-fuchsia-800 to-stone-800', 2),
  f4: visual('green grapes', 'from-lime-800 via-emerald-700 to-stone-700', 3),
  f5: visual('oranges citrus', 'from-orange-800 via-amber-700 to-yellow-700', 4),
  f6: visual('bananas market', 'from-yellow-700 via-amber-700 to-stone-700', 5),
  f7: visual('kiwi fruit', 'from-lime-900 via-emerald-800 to-stone-800', 0),
  f8: visual('mandarins citrus', 'from-orange-800 via-amber-700 to-stone-700', 1),
  f9: visual('sweet cherries', 'from-red-900 via-rose-800 to-stone-800', 2),
  f10: visual('fresh strawberries', 'from-red-800 via-rose-700 to-lime-700', 3),
  f11: visual('blueberries fresh', 'from-blue-900 via-indigo-800 to-stone-800', 4),
  f12: visual('watermelon slices', 'from-emerald-900 via-red-800 to-stone-800', 5),
  g1: visual('parsley herbs', 'from-emerald-900 via-lime-800 to-stone-800', 0),
  g2: visual('fresh dill herbs', 'from-emerald-900 via-lime-800 to-stone-800', 1),
  g3: visual('green onions', 'from-emerald-900 via-lime-800 to-stone-800', 2),
  g4: visual('iceberg lettuce', 'from-lime-900 via-emerald-800 to-stone-800', 3),
  g5: visual('arugula leaves', 'from-emerald-900 via-lime-800 to-stone-800', 4),
  g6: visual('spinach leaves', 'from-emerald-900 via-green-800 to-stone-800', 5),
  g7: visual('basil herbs', 'from-emerald-900 via-lime-800 to-stone-800', 0),
  g8: visual('cilantro herbs', 'from-emerald-900 via-lime-800 to-stone-800', 1),
  g9: visual('mint leaves', 'from-emerald-900 via-teal-800 to-stone-800', 2),
  g10: visual('mixed salad leaves', 'from-lime-900 via-emerald-800 to-stone-800', 3),
  s1: visual('vegetable box delivery', 'from-amber-800 via-lime-800 to-emerald-900', 0),
  s2: visual('premium vegetable basket', 'from-amber-800 via-red-800 to-lime-800', 1),
  s3: visual('grill vegetables', 'from-orange-800 via-red-800 to-stone-800', 2),
  s4: visual('autumn vegetables basket', 'from-amber-900 via-orange-800 to-stone-800', 3),
  s5: visual('fruit basket citrus berries', 'from-orange-800 via-red-700 to-lime-800', 4),
  s6: visual('chef vegetables restaurant', 'from-stone-800 via-emerald-800 to-amber-800', 5),
}

Object.values(PRODUCTS).forEach((items) => {
  items.forEach((product) => Object.assign(product, PRODUCT_VISUALS[product.id]))
})

export const TOP_PRODUCT = {
  ...PRODUCTS['Сезонные наборы'][1],
  oldPrice: 349.9,
  features: ['15+ позиций премиум', 'Свежесть 7 дней', 'Эко-упаковка', 'Доставка в день заказа'],
}
