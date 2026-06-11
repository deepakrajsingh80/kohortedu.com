import { Link } from "react-router";
import { X, Trash2, ShoppingCart, ArrowRight, Shield, Zap, Crown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

export default function CartDrawer() {
  const { items, removeItem, total, itemCount, isOpen, setIsOpen } = useCart();
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <p className="text-xs text-slate-500">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-900 font-semibold mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-500 mb-6">Add a premium bundle to get started</p>
              <button onClick={() => setIsOpen(false)} className="text-teal-600 font-semibold text-sm hover:underline">
                Continue browsing
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-slate-50 rounded-xl border border-slate-100 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors">
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-amber-700">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-teal-500" /> SSL Secure</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> Instant Access</span>
              <span className="flex items-center gap-1"><Crown className="w-3 h-3 text-amber-500" /> 30-Day Guarantee</span>
            </div>

            {/* Price summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-600">Subtotal</span><span className="font-semibold text-slate-900">₹{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-600">GST (18%)</span><span className="font-semibold text-slate-900">₹{Math.round(total * 0.18).toLocaleString()}</span></div>
              <div className="border-t border-slate-200 pt-2 flex justify-between"><span className="font-bold text-slate-900">Total</span><span className="font-bold text-xl text-amber-700">₹{Math.round(total * 1.18).toLocaleString()}</span></div>
            </div>

            <Link
              to="/checkout"
              onClick={() => {
                setIsOpen(false);
                localStorage.setItem("kc_premium_source_url", window.location.hash);
              }}
            >
              <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-white py-6 text-base font-bold rounded-xl shadow-lg shadow-amber-500/25">
                Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <button onClick={() => setIsOpen(false)} className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-2">
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
