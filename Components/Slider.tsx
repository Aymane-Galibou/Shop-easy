import { motion } from "framer-motion";
import SmartLink from "@/Components/SmartLink/SmartLink";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"; // Assuming you use lucide-react
import Image from "next/image";


export default function EcommerceHero() {
  return (
<section className="relative z-0 w-full min-h-screen py-10 flex items-center bg-white dark:bg-[#0a0a0a] overflow-hidden">      {/* Dynamic Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT: THE HOOK & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
              <Sparkles size={14} /> New Season Collection
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
              Premium Quality. <br />
              <span className="text-orange-500 italic">Unbeatable</span> Prices.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-normal">
              Upgrade your lifestyle with our curated selection of top-tier electronics and fashion. 
              <span className="text-slate-800 font-medium"> Fast delivery across Morocco.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <SmartLink href="/shop">
              <span className="px-12 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 group">
                <ShoppingBag size={20} />
                Shop Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </SmartLink>
            
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter text-center lg:text-left">
                Flash Sale Ends In:
              </p>
              <p className="text-lg font-mono font-bold text-slate-800">12 : 45 : 02</p>
            </div>
          </div>

          {/* Trust Badges for E-commerce */}
          <div className="flex items-center justify-center lg:justify-start gap-8 pt-6">
            <div className="text-center lg:text-left">
              <p className="text-xl font-bold text-slate-900">4.9/5</p>
              <p className="text-xs text-slate-400 font-bold uppercase">Customer Rating</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center lg:text-left">
              <p className="text-xl font-bold text-slate-900">24h</p>
              <p className="text-xs text-slate-400 font-bold uppercase">Average Shipping</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: THE PRODUCT SHOWCASE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          {/* Main Visual Image */}
<div className="relative group">
           {/* THE FIX: z-0 here ensures it never covers the z-[999] navbar */}
           <div className="relative z-0 w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                fill 
                src="/hero.jpg" 
                alt="Product" 
                priority 
                className="object-cover"
              />
           </div>
           
           {/* Price Tag with z-10 (still below nav) */}
           <div className="absolute z-10 bottom-6 left-6 bg-white/90 dark:bg-black/90 p-4 rounded-xl border border-orange-500/20 backdrop-blur-md">
              <p className="text-orange-500 font-black text-2xl">299 MAD</p>
           </div>
        </div>

          {/* Floating Aesthetic Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full -z-10 animate-pulse" />
          <div className="absolute -bottom-5 -left-5 w-full h-full border-[1px] border-slate-200 rounded-[2rem] -z-10" />
        </motion.div>

      </div>
    </section>
  );
}