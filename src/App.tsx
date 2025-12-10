import React, { useState } from 'react';
import { 
  CreditCard, 
  Truck, 
  Package, 
  CheckCircle, 
  DollarSign, 
  Store, 
  User, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  MapPin,
  ShoppingBag,
  Menu,
  X,
  Wallet,
  Clock,
  Search,
  ChevronRight,
  BarChart3,
  Users,
  Building,
  LogOut,
  Settings,
  AlertTriangle,
  XCircle
} from 'lucide-react';

// --- DATOS SIMULADOS ---
const INITIAL_ORDERS = [
  { id: 'ORD-29381', product: 'Tenis Running Pro', price: 180000, shop: 'Deportes XYZ', customer: 'Sebastián G.', status: 'en_camino', paymentStatus: 'retenido', step: 2, commission: 9000 },
  { id: 'ORD-29382', product: 'Camiseta Deportiva', price: 65000, shop: 'Moda Fit', customer: 'Ana María L.', status: 'procesando', paymentStatus: 'retenido', step: 1, commission: 3250 },
  { id: 'ORD-29380', product: 'Reloj Inteligente', price: 350000, shop: 'Deportes XYZ', customer: 'Carlos P.', status: 'entregado', paymentStatus: 'cobrado', step: 3, commission: 17500 },
];

const PRODUCTS = [
  { id: 1, name: 'Tenis Running Pro', price: 180000, img: '👟', desc: 'Máxima amortiguación', shop: 'Deportes XYZ' },
  { id: 2, name: 'Reloj Inteligente V2', price: 350000, img: '⌚', desc: 'Monitor cardiaco', shop: 'Deportes XYZ' },
  { id: 3, name: 'Morral Impermeable', price: 120000, img: '🎒', desc: 'Capacidad 30L', shop: 'Moda Fit' },
];

export default function ContraPagoApp() {
  const [currentRole, setCurrentRole] = useState('guest'); // guest, client, business, admin
  const [view, setView] = useState('landing'); 
  const [notification, setNotification] = useState(null);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);
  const [cart, setCart] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null); // Estado para simular error

  // --- LÓGICA ---

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const updateOrderStatus = (orderId, newStatus, newStep, newPayment) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        const updated = { ...order, status: newStatus, step: newStep };
        if (newPayment) updated.paymentStatus = newPayment;
        if (selectedOrder.id === orderId) setSelectedOrder(updated);
        return updated;
      }
      return order;
    }));
  };

  const handleBuyProduct = (product) => {
    setCart(product);
    setCheckoutError(null);
    setCurrentRole('client');
    setView('checkout');
  };

  const confirmPurchase = () => {
    setCheckoutError(null);
    showNotification("¡Pre-autorización exitosa! Fondos congelados.");
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      product: cart.name,
      price: cart.price,
      shop: cart.shop,
      customer: 'Cliente Demo',
      status: 'procesando',
      paymentStatus: 'retenido',
      step: 1,
      commission: cart.price * 0.05 // 5% comisión simulada
    };
    setOrders([newOrder, ...orders]);
    setSelectedOrder(newOrder);
    
    setTimeout(() => {
        showNotification("Compra realizada. Cambiando a vista Negocio...", "info");
        setCurrentRole('business');
        setView('dashboard');
    }, 2000);
  };

  const failPurchase = () => {
      setCheckoutError("Fondos Insuficientes");
      showNotification("TRANSACCIÓN RECHAZADA: No se generó orden de despacho.", "error");
  };

  // --- VISTAS AUXILIARES ---

  const RoleSwitcher = () => (
    <div className="fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 text-xs py-1 px-4 flex justify-between items-center shadow-md">
      <span className="opacity-50 font-mono">MODO DEMOSTRACIÓN</span>
      <div className="flex gap-4">
        <button onClick={() => { setCurrentRole('client'); setView('marketplace'); }} className={`hover:text-blue-300 ${currentRole === 'client' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>👤 Cliente</button>
        <button onClick={() => { setCurrentRole('business'); setView('dashboard'); }} className={`hover:text-blue-300 ${currentRole === 'business' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>🏪 Negocio</button>
        <button onClick={() => { setCurrentRole('admin'); setView('dashboard'); }} className={`hover:text-blue-300 ${currentRole === 'admin' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>🛡️ Admin (Víctor)</button>
      </div>
    </div>
  );

  // --- VISTAS PRINCIPALES ---

  const LandingView = () => (
    <div className="pt-8 flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="flex justify-between items-center p-6 container mx-auto">
        <div className="flex items-center gap-2 font-bold text-2xl">
          <Truck className="text-emerald-400" /> ContraPago
        </div>
        <div className="hidden md:flex gap-6 text-sm text-slate-300">
          <span className="hover:text-white cursor-pointer">Cómo funciona</span>
          <span className="hover:text-white cursor-pointer">Integraciones</span>
          <button onClick={() => { setCurrentRole('admin'); setView('dashboard'); }} className="text-emerald-400 hover:text-emerald-300 font-semibold">Soy Administrador</button>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center container mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-8 border border-emerald-500/20">
          <ShieldCheck className="w-3 h-3" /> TECNOLOGÍA FINTECH SEGURA
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
          Tu pago contra entrega<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ahora es digital.</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Conectamos logística bancaria con logística de transporte. 
          Congelamos el pago en la tarjeta del cliente y lo liberamos automáticamente cuando el paquete es entregado.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
          <button 
            onClick={() => { setCurrentRole('client'); setView('marketplace'); }}
            className="group relative bg-white text-slate-900 font-bold py-5 px-6 rounded-2xl flex items-center justify-between hover:bg-emerald-50 transition-all shadow-xl shadow-emerald-900/20"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Demo</span>
              <span className="text-lg">Soy Comprador</span>
            </div>
            <div className="bg-slate-100 p-2 rounded-full group-hover:bg-emerald-200 transition-colors">
               <ShoppingBag className="w-5 h-5 group-hover:text-emerald-800" />
            </div>
          </button>
          
          <button 
            onClick={() => { setCurrentRole('business'); setView('dashboard'); }}
            className="group relative bg-white/5 border border-white/10 text-white font-bold py-5 px-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Demo</span>
              <span className="text-lg">Soy Vendedor</span>
            </div>
            <div className="bg-white/10 p-2 rounded-full group-hover:bg-white/20 transition-colors">
               <Store className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const MarketplaceView = () => (
    <div className="pt-8 min-h-screen bg-slate-50">
      <header className="bg-white px-6 py-4 shadow-sm sticky top-8 z-10 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-4">
            <button onClick={() => setView('landing')} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                <ArrowRight className="rotate-180 w-5 h-5" />
            </button>
            <span className="font-bold text-xl text-slate-800 tracking-tight">Marketplace Demo</span>
        </div>
        <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors text-slate-500">
                <Search className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">C</div>
        </div>
      </header>
      
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Novedades</h2>
                <p className="text-slate-500 mt-1">Explora productos con pago seguro contra entrega.</p>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.map(prod => (
            <div key={prod.id} className="group bg-white rounded-3xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="bg-slate-50 rounded-2xl h-48 flex items-center justify-center text-7xl mb-6 group-hover:scale-105 transition-transform duration-500">
                  {prod.img}
              </div>
              <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-800">{prod.name}</h3>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">{prod.shop}</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 flex-1">{prod.desc}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <p className="font-bold text-2xl text-slate-900">${prod.price.toLocaleString()}</p>
                <button 
                  onClick={() => handleBuyProduct(prod)}
                  className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-200"
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CheckoutView = () => (
    <div className="pt-8 min-h-screen bg-slate-100 p-4 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Side: Product Info */}
        <div className="md:w-5/12 bg-slate-50 p-8 border-r border-slate-100 flex flex-col">
           <button onClick={() => setView('marketplace')} className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center gap-2 mb-8">
               <ArrowRight className="rotate-180 w-4 h-4" /> Volver a la tienda
           </button>
           <div className="flex-1 flex flex-col items-center justify-center text-center">
               <div className="w-32 h-32 bg-white rounded-2xl shadow-sm flex items-center justify-center text-6xl mb-6 border border-slate-100">
                   {cart?.img || '📦'}
               </div>
               <h2 className="text-2xl font-bold text-slate-800 mb-2">{cart?.name}</h2>
               <p className="text-slate-500 mb-6">{cart?.desc}</p>
               <div className="w-full border-t border-slate-200 pt-6">
                   <div className="flex justify-between text-sm mb-2 text-slate-500">
                       <span>Subtotal</span>
                       <span>${cart?.price.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-sm mb-4 text-slate-500">
                       <span>Envío</span>
                       <span>$0.00</span>
                   </div>
                   <div className="flex justify-between text-xl font-bold text-slate-900">
                       <span>Total a Pagar</span>
                       <span>${cart?.price.toLocaleString()}</span>
                   </div>
               </div>
           </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="md:w-7/12 p-8 bg-white relative">
            <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-2 rounded-bl-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> PAGO SEGURO
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Finalizar Compra</h2>
            
            {checkoutError ? (
                // PANTALLA DE ERROR (Simulación Sin Fondos)
                <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-red-700 mb-2">Pago Rechazado</h3>
                    <p className="text-sm text-red-600 mb-6">
                        El banco ha rechazado la pre-autorización por fondos insuficientes.
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-red-200 text-xs text-left mb-6 shadow-sm">
                        <p className="font-bold text-slate-700 mb-1 flex items-center gap-2">
                            <Truck className="w-3 h-3" /> Estado Logístico:
                        </p>
                        <p className="text-red-500 font-mono">
                            [BLOQUEADO] No se generó guía de transporte. El producto NO ha salido de la tienda.
                        </p>
                    </div>
                    <button 
                        onClick={() => setCheckoutError(null)}
                        className="text-slate-500 text-sm hover:text-slate-800 font-bold underline"
                    >
                        Intentar con otra tarjeta
                    </button>
                </div>
            ) : (
                // FORMULARIO NORMAL
                <div className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Dirección de Entrega</label>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600 text-sm flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            Calle 123 #45-67, Bogotá D.C.
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Método de Pago</label>
                        <div className="border-2 border-emerald-500 bg-emerald-50/30 p-4 rounded-xl relative">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white p-2 rounded-lg shadow-sm">
                                    <CreditCard className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Pago Contra Entrega Digital</p>
                                    <p className="text-xs text-slate-500">Tarjeta Crédito / Débito</p>
                                </div>
                            </div>
                            <input type="text" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" className="w-full bg-white border border-emerald-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-mono mb-2" />
                            <div className="flex gap-2">
                                <input type="text" placeholder="MM/AA" defaultValue="12/25" className="w-1/2 bg-white border border-emerald-200 rounded-lg px-4 py-3 text-sm outline-none font-mono" />
                                <input type="text" placeholder="CVC" defaultValue="123" className="w-1/2 bg-white border border-emerald-200 rounded-lg px-4 py-3 text-sm outline-none font-mono" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3">
                        <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                            <strong>Pre-autorización:</strong> Congelaremos el cupo temporalmente. El cobro real solo se procesará cuando la transportadora confirme que recibiste el paquete.
                        </p>
                    </div>

                    <button 
                    onClick={confirmPurchase}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                    >
                    Confirmar y Congelar Fondos
                    <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    {/* BOTÓN DEMO ERROR */}
                    <button 
                        onClick={failPurchase}
                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
                    >
                        <AlertTriangle className="w-3 h-3" />
                        (Demo) Simular Tarjeta Sin Fondos
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );

  const DashboardView = () => {
    // Lógica para diferenciar datos según rol
    const isAdmin = currentRole === 'admin';
    
    // Si es Admin, ve TODO. Si es Negocio, ve solo lo de "Deportes XYZ"
    const dashboardOrders = isAdmin 
        ? orders 
        : orders.filter(o => o.shop === 'Deportes XYZ');
    
    // Cálculos
    const totalVentas = dashboardOrders.reduce((acc, curr) => acc + curr.price, 0);
    const totalComision = dashboardOrders.reduce((acc, curr) => acc + (curr.commission || 0), 0);
    const saldoDisponible = dashboardOrders.filter(o => o.paymentStatus === 'cobrado').reduce((acc, curr) => acc + (isAdmin ? (curr.commission || 0) : curr.price), 0);
    const saldoRetenido = dashboardOrders.filter(o => o.paymentStatus === 'retenido').reduce((acc, curr) => acc + (isAdmin ? (curr.commission || 0) : curr.price), 0);

    // Títulos y Colores según Rol
    const themeColor = isAdmin ? 'bg-slate-900' : 'bg-blue-600';
    const roleTitle = isAdmin ? 'Administrador Maestro' : 'Panel de Vendedor';
    const subTitle = isAdmin ? 'Vista Global de la Plataforma' : 'Tienda: Deportes XYZ';

    return (
    <div className="pt-8 min-h-screen bg-slate-50 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Dinámico */}
        <div className={`w-full md:w-72 ${themeColor} text-white p-6 flex flex-col gap-8 shrink-0 transition-colors duration-500`}>
            <div className="flex items-center gap-3 font-bold text-xl">
                <div className="bg-white/10 p-2 rounded-lg"><Truck className="text-white" /></div>
                <div>
                    <h1 className="leading-none">ContraPago</h1>
                    <span className="text-[10px] opacity-60 font-normal uppercase tracking-wider">{isAdmin ? 'ADMIN' : 'PARTNER'}</span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest mb-4">Menú Principal</p>
                
                <div className="bg-white/10 text-white p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer shadow-sm ring-1 ring-white/5">
                    <BarChart3 className="w-5 h-5 opacity-80"/> Dashboard
                </div>

                {isAdmin ? (
                    // Menú ADMIN
                    <>
                        <div className="text-white/60 hover:bg-white/5 p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors"><Users className="w-5 h-5 opacity-70"/> Usuarios</div>
                        <div className="text-white/60 hover:bg-white/5 p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors"><Building className="w-5 h-5 opacity-70"/> Comercios</div>
                        <div className="text-white/60 hover:bg-white/5 p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors"><Settings className="w-5 h-5 opacity-70"/> Configuración</div>
                    </>
                ) : (
                    // Menú NEGOCIO
                    <>
                         <div className="text-white/60 hover:bg-white/5 p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors"><Package className="w-5 h-5 opacity-70"/> Mis Pedidos</div>
                         <div className="text-white/60 hover:bg-white/5 p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors"><ShoppingBag className="w-5 h-5 opacity-70"/> Productos</div>
                         <div className="text-white/60 hover:bg-white/5 p-3 rounded-xl text-sm font-semibold flex items-center gap-3 cursor-pointer transition-colors"><Wallet className="w-5 h-5 opacity-70"/> Retiros</div>
                    </>
                )}
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
                <button onClick={() => setView('landing')} className="text-white/60 text-sm hover:text-white flex items-center gap-2 w-full p-2 rounded-lg hover:bg-white/5 transition-all">
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                </button>
            </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 p-4 md:p-10 overflow-y-auto h-screen pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{roleTitle}</h2>
                    <p className="text-slate-500 font-medium">{subTitle}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-slate-800">{isAdmin ? 'Víctor Admin' : 'Gerente Tienda'}</p>
                        <p className="text-xs text-slate-500">{isAdmin ? 'Superusuario' : 'ID: 88291'}</p>
                    </div>
                    <div className={`w-12 h-12 ${isAdmin ? 'bg-slate-800' : 'bg-blue-100'} rounded-full flex items-center justify-center text-lg font-bold ${isAdmin ? 'text-white' : 'text-blue-600'}`}>
                        {isAdmin ? 'V' : 'T'}
                    </div>
                </div>
            </div>

            {/* KPIs Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {/* Card 1: Ingreso Total */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl ${isAdmin ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Este Mes</span>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold mb-1">{isAdmin ? 'Comisiones Totales' : 'Ventas Totales'}</p>
                    <h3 className="text-3xl font-bold text-slate-800">${(isAdmin ? totalComision : totalVentas).toLocaleString()}</h3>
                </div>

                {/* Card 2: Saldo Disponible */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 ring-2 ring-emerald-50">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
                            <Wallet className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold mb-1">Saldo Disponible</p>
                    <h3 className="text-3xl font-bold text-emerald-600">${saldoDisponible.toLocaleString()}</h3>
                    <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Listo para transferir</p>
                </div>

                 {/* Card 3: Saldo Retenido */}
                 <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold mb-1">En Canje (Retenido)</p>
                    <h3 className="text-3xl font-bold text-slate-800">${saldoRetenido.toLocaleString()}</h3>
                    <p className="text-[10px] text-amber-600 font-bold mt-1">Esperando entrega logística</p>
                </div>

                {/* Card 4: Pedidos Activos */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                            <Truck className="w-6 h-6" />
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold mb-1">En Ruta</p>
                    <h3 className="text-3xl font-bold text-slate-800">
                        {dashboardOrders.filter(o => o.status === 'en_camino' || o.status === 'procesando').length}
                    </h3>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Tabla de Ordenes */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-800">Transacciones Recientes</h3>
                        <button className="text-sm text-blue-600 font-bold hover:underline">Ver Todo</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-50 font-semibold">
                                <tr>
                                    <th className="px-6 py-4">ID / Fecha</th>
                                    <th className="px-6 py-4">Detalle</th>
                                    {isAdmin && <th className="px-6 py-4">Tienda</th>}
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4 text-right">Monto</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {dashboardOrders.map(order => (
                                    <tr 
                                      key={order.id} 
                                      onClick={() => setSelectedOrder(order)}
                                      className={`cursor-pointer transition-all hover:bg-blue-50/50 ${selectedOrder.id === order.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-mono font-bold text-slate-700">{order.id}</div>
                                            <div className="text-xs text-slate-400">Hace 2 horas</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">{order.product}</div>
                                            <div className="text-xs text-slate-500">{order.customer}</div>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4">
                                                <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{order.shop}</span>
                                            </td>
                                        )}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                 <span className={`text-[10px] font-bold uppercase ${order.status === 'entregado' ? 'text-emerald-600' : 'text-blue-600'}`}>
                                                    {order.status.replace('_', ' ')}
                                                 </span>
                                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${order.paymentStatus === 'cobrado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {order.paymentStatus}
                                                 </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-700">
                                            ${(isAdmin ? order.commission : order.price).toLocaleString()}
                                            {isAdmin && <div className="text-[10px] text-slate-400 font-normal">comisión</div>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Panel de Simulación / Detalle */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sticky top-6">
                        <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-50">
                             <div>
                                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Detalle de Orden</p>
                                 <h3 className="font-bold text-xl text-slate-800">{selectedOrder.id}</h3>
                             </div>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedOrder.paymentStatus === 'cobrado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                 {selectedOrder.paymentStatus.toUpperCase()}
                             </span>
                        </div>

                        {/* Visualización de API Logística */}
                        <div className="space-y-6">
                             <div className="relative pl-4 border-l-2 border-slate-100 space-y-6">
                                 {/* Paso 1 */}
                                 <div className="relative">
                                     <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white ${selectedOrder.step >= 1 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                     <p className="text-sm font-bold text-slate-800">Orden Creada</p>
                                     <p className="text-xs text-slate-500">Cupo pre-autorizado en banco.</p>
                                 </div>
                                 {/* Paso 2 */}
                                 <div className="relative">
                                     <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white transition-colors duration-500 ${selectedOrder.step >= 2 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                                     <p className="text-sm font-bold text-slate-800">En Reparto</p>
                                     <p className="text-xs text-slate-500">Transportadora recoge el paquete.</p>
                                 </div>
                                 {/* Paso 3 */}
                                 <div className="relative">
                                     <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white transition-colors duration-500 ${selectedOrder.step >= 3 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                     <p className="text-sm font-bold text-slate-800">Entregado & Cobrado</p>
                                     <p className="text-xs text-slate-500">Cliente recibe. Plataforma debita.</p>
                                 </div>
                             </div>

                             {/* CONTROLES DE SIMULACIÓN */}
                             <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                     <Smartphone className="w-3 h-3"/> Simulador API Logística
                                 </p>
                                 
                                 <div className="grid grid-cols-1 gap-3">
                                    <button 
                                        onClick={() => updateOrderStatus(selectedOrder.id, 'en_camino', 2, 'retenido')}
                                        disabled={selectedOrder.step >= 2}
                                        className={`py-2 px-4 rounded-lg text-xs font-bold transition-all border ${
                                            selectedOrder.step >= 2 ? 'bg-slate-100 text-slate-400 border-transparent' : 'bg-white border-slate-300 hover:border-blue-500 text-slate-700 shadow-sm'
                                        }`}
                                    >
                                        1. Transportadora Recoge
                                    </button>
                                    <button 
                                        onClick={() => {
                                            updateOrderStatus(selectedOrder.id, 'entregado', 3);
                                            showNotification("¡Webhook Recibido! Entrega confirmada.");
                                            setTimeout(() => {
                                                updateOrderStatus(selectedOrder.id, 'entregado', 3, 'cobrado');
                                                showNotification("DINERO CAPTURADO Y DISPONIBLE", "money");
                                            }, 1500);
                                        }}
                                        disabled={selectedOrder.step !== 2}
                                        className={`py-3 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                                            selectedOrder.step === 3 
                                            ? 'bg-emerald-600 text-white cursor-default'
                                            : selectedOrder.step === 2
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 animate-pulse'
                                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {selectedOrder.step === 3 ? 'PROCESO FINALIZADO' : '2. CONFIRMAR ENTREGA'}
                                    </button>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  };

  return (
    <div className="font-sans antialiased text-slate-900 bg-slate-100 min-h-screen relative">
      <RoleSwitcher />
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 transition-all animate-bounce border-l-4 ${
            notification.type === 'money' ? 'bg-white border-emerald-500 text-emerald-800' : 
            notification.type === 'info' ? 'bg-slate-800 border-blue-500 text-white' :
            notification.type === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
            'bg-white border-blue-600 text-slate-800'
        }`}>
          <div className={`p-2 rounded-full ${
              notification.type === 'money' ? 'bg-emerald-100' : 
              notification.type === 'error' ? 'bg-red-100' : 
              'bg-slate-700'
          }`}>
              {notification.type === 'money' ? <DollarSign className="w-5 h-5" /> : 
               notification.type === 'error' ? <XCircle className="w-5 h-5 text-red-500" /> :
               <CheckCircle className="w-5 h-5 text-blue-400" />}
          </div>
          <div>
              <p className="font-bold text-sm">{notification.message}</p>
          </div>
        </div>
      )}

      {view === 'landing' && <LandingView />}
      {view === 'marketplace' && <MarketplaceView />}
      {view === 'checkout' && <CheckoutView />}
      {view === 'dashboard' && <DashboardView />}
    </div>
  );
}