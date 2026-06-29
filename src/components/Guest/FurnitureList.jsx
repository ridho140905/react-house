import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import FurnitureCard from './FurnitureCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

const FurnitureList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Koleksi Terbaru</h2>
          <p className="text-gray-500 mt-1">Temukan furniture impian untuk rumah Anda.</p>
        </div>
        <button className="text-[#4F45B6] font-semibold hover:text-[#3c348f] text-sm">Lihat Semua</button>
      </div>
      
      {loading ? (
        <div className="text-center py-10 text-gray-500">Memuat katalog...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Belum ada produk.</div>
      ) : (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((item) => (
              <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 xl:basis-1/4">
                <div className="p-1">
                  <FurnitureCard item={item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Arrow navigation buttons that don't cover the cards but sit outside or float */}
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default FurnitureList;
