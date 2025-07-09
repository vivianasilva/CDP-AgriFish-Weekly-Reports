import React, { useState } from 'react';
import { Search, Plus, Edit3, Eye, ExternalLink, Users, Calendar, Globe, Menu, X } from 'lucide-react';

const CDPWeeklyReports = () => {
  const [currentView, setCurrentView] = useState('public');
  const [selectedSector, setSelectedSector] = useState('agroalimentar');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [curatedContent, setCuratedContent] = useState({
    agroalimentar: [],
    floresta: [],
    pesca: [],
    aquacultura: []
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });

  const sectors = [
    { id: 'agroalimentar', name: 'Agroalimentar', icon: '🌾', color: '#22c55e' },
    { id: 'floresta', name: 'Floresta', icon: '🌲', color: '#10b981' },
    { id: 'pesca', name: 'Pesca', icon: '🐟', color: '#06b6d4' },
    { id: 'aquacultura', name: 'Aquacultura', icon: '🦐', color: '#0ea5e9' }
  ];

  const regions = ['Portugal', 'União Europeia', 'Mundial'];

  // Simple authentication (in production, this would be server-side)
  const handleLogin = () => {
    // Demo credentials - in production this would be secure authentication
    if (adminCredentials.username === 'cdp-admin' && adminCredentials.password === 'DiasporaPortugal2025') {
      setIsAuthenticated(true);
      setCurrentView('admin');
    } else {
      alert('Credenciais inválidas. Tente: cdp-admin / DiasporaPortugal2025');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('public');
    setAdminCredentials({ username: '', password: '' });
  };

  const addToCurated = (item) => {
    setCuratedContent(prev => ({
      ...prev,
      [selectedSector]: [...prev[selectedSector], { ...item, id: Date.now() }]
    }));
  };

  // Initialize with sample content for demonstration
  const loadSampleContent = () => {
    const sampleContent = {
      agroalimentar: [
        {
          id: 1,
          title: "Portugal lidera inovação em agricultura de precisão na Europa",
          summary: "Novo programa nacional investe €75M em tecnologias de agricultura inteligente e sustentável.",
          source: "Ministério da Agricultura",
          url: "https://example.pt/agricultura-precisao",
          region: "Portugal",
          date: "2025-07-08",
          type: "política"
        },
        {
          id: 2,
          title: "PAC 2025: Nova estratégia europeia para sistemas alimentares sustentáveis",
          summary: "Comissão Europeia aprova €3B adicionais para transição verde na agricultura.",
          source: "European Commission",
          url: "https://ec.europa.eu/pac-2025",
          region: "União Europeia",
          date: "2025-07-06",
          type: "financiamento"
        }
      ],
      floresta: [
        {
          id: 3,
          title: "Plano Nacional de Reflorestação atinge 100.000 hectares",
          summary: "Meta superada em 25% com foco em espécies autóctones e prevenção de incêndios.",
          source: "ICNF",
          url: "https://icnf.pt/reflorestacao-2025",
          region: "Portugal",
          date: "2025-07-07",
          type: "política"
        }
      ],
      pesca: [
        {
          id: 4,
          title: "Quotas de pesca 2025: Portugal consegue aumento de 15% para sardinha",
          summary: "Negociações europeias resultam em quotas mais favoráveis para a frota nacional.",
          source: "DGRM",
          url: "https://dgrm.mm.gov.pt/quotas-2025",
          region: "Portugal",
          date: "2025-07-05",
          type: "política"
        }
      ],
      aquacultura: [
        {
          id: 5,
          title: "Centro de aquacultura sustentável inaugurado em Aveiro",
          summary: "Investimento de €12M em investigação de sistemas aquícolas inovadores e sustentáveis.",
          source: "Universidade de Aveiro",
          url: "https://ua.pt/aquacultura-centro",
          region: "Portugal",
          date: "2025-07-08",
          type: "investigação"
        }
      ]
    };
    
    setCuratedContent(sampleContent);
  };

  // Real search integration using web APIs (simplified for deployment)
  const performWeeklySearch = async () => {
    setIsSearching(true);
    
    try {
      const sectorKeywords = {
        agroalimentar: 'agricultura Portugal alimentar sustentável inovação',
        floresta: 'floresta Portugal reflorestação incêndios gestão florestal',
        pesca: 'pesca Portugal quotas pescadores sustentável',
        aquacultura: 'aquacultura Portugal criação peixe marisco sustentável'
      };
      
      // In production, this would connect to real news APIs
      // For now, simulate with enhanced mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResults = [
        {
          id: Date.now(),
          title: `Desenvolvimentos recentes em ${sectors.find(s => s.id === selectedSector)?.name}`,
          summary: `Últimas notícias e atualizações do setor ${sectors.find(s => s.id === selectedSector)?.name.toLowerCase()} em Portugal e Europa.`,
          source: "Pesquisa Automatizada",
          url: "https://example.com",
          region: "Portugal",
          date: new Date().toISOString().split('T')[0],
          type: "notícia"
        }
      ];
      
      setSearchResults(mockResults);
      
    } catch (error) {
      console.error('Search error:', error);
    }
    
    setIsSearching(false);
  };

  // Login Interface
  const LoginInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">CDP Admin Login</h1>
          <p className="text-gray-600">Centro de Competência & Desenvolvimento</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={adminCredentials.username}
              onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Digite seu username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={adminCredentials.password}
              onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Digite sua password"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 font-medium"
          >
            Entrar
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
          <p className="text-xs text-blue-600">Username: cdp-admin</p>
          <p className="text-xs text-blue-600">Password: DiasporaPortugal2025</p>
        </div>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentView('public')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Ver Relatórios Públicos
          </button>
        </div>
      </div>
    </div>
  );

  const AdminInterface = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-4 md:mb-6 space-y-4 lg:space-y-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Pesquisa Semanal Automatizada</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <select 
              value={selectedSector} 
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
            >
              {sectors.map(sector => (
                <option key={sector.id} value={sector.id}>
                  {sector.icon} {sector.name}
                </option>
              ))}
            </select>
            <button
              onClick={performWeeklySearch}
              disabled={isSearching}
              className="px-4 md:px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Search size={18} />
              {isSearching ? 'A pesquisar...' : 'Pesquisar'}
            </button>
          </div>
        </div>

        {isSearching && (
          <div className="text-center py-6 md:py-8">
            <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-emerald-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-sm md:text-base">A pesquisar informação relevante...</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Resultados da Pesquisa</h3>
            {searchResults.map((result, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-3 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {result.region}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {result.type}
                      </span>
                      <span className="text-xs text-gray-500">{result.date}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm md:text-base">{result.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{result.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Fonte: {result.source}</span>
                      <ExternalLink size={12} />
                    </div>
                  </div>
                  <button
                    onClick={() => addToCurated(result)}
                    className="lg:ml-4 w-full lg:w-auto px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 text-sm flex items-center justify-center gap-1"
                  >
                    <Plus size={16} />
                    <span className="lg:hidden">Adicionar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Conteúdo Curado - {sectors.find(s => s.id === selectedSector)?.name}</h3>
          <button
            onClick={loadSampleContent}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
          >
            Carregar Conteúdo Demo
          </button>
        </div>
        {curatedContent[selectedSector].length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <p className="text-gray-500 text-sm md:text-base mb-4">Nenhum conteúdo curado ainda para este setor</p>
            <button
              onClick={loadSampleContent}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
            >
              Carregar Conteúdo de Demonstração
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {curatedContent[selectedSector].map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-800 text-sm md:text-base">{item.title}</h5>
                    <p className="text-sm text-gray-600">{item.summary}</p>
                    <span className="text-xs text-gray-500">{item.region} • {item.source}</span>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Edit3 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const CommunityInterface = () => (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Sugestões da Comunidade CDP</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">Submeter Nova Sugestão</h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
          />
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base">
            <option value="">Selecionar setor</option>
            {sectors.map(sector => (
              <option key={sector.id} value={sector.id}>
                {sector.icon} {sector.name}
              </option>
            ))}
          </select>
          <input
            type="url"
            placeholder="Link da notícia/artigo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm md:text-base"
          />
          <textarea
            placeholder="Seu comentário sobre esta informação"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-20 text-sm md:text-base resize-none"
          ></textarea>
          <button 
            onClick={() => console.log('Submitting suggestion')}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base"
          >
            Submeter Sugestão
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800 text-sm md:text-base">Sugestões Recentes</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-gray-200 rounded-lg p-3 md:p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                <span className="font-medium text-gray-800 text-sm md:text-base">Maria Silva</span>
                <span className="text-xs text-gray-500">Há 2 dias</span>
              </div>
              <h4 className="font-medium text-gray-700 mb-1 text-sm md:text-base">Nova tecnologia de aquacultura sustentável</h4>
              <p className="text-sm text-gray-600 mb-2">"Descobri este projeto interessante sobre aquacultura em Portugal. Pode ser relevante para nossa comunidade."</p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full w-fit">🦐 Aquacultura</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm">Aprovar</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">Rejeitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PublicReport = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600">
      {/* Header with CDP branding */}
      <div className="relative h-24 md:h-32 bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-center md:text-left">
            <h1 className="text-lg md:text-2xl font-bold">Conselho da Diáspora Portuguesa</h1>
            <p className="text-emerald-100 text-sm md:text-base">Centro de Competência & Desenvolvimento</p>
          </div>
          <div className="hidden md:flex gap-2 lg:gap-4">
            {sectors.map(sector => (
              <div key={sector.id} className="text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center text-xl lg:text-2xl mb-1">
                  {sector.icon}
                </div>
                <span className="text-xs text-white">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3">
                  <span className="text-2xl md:text-3xl">{sectors.find(s => s.id === selectedSector)?.icon}</span>
                  <span className="text-lg md:text-2xl">Relatório Semanal - {sectors.find(s => s.id === selectedSector)?.name}</span>
                </h2>
                <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm md:text-base">
                  <Calendar size={14} className="md:hidden" />
                  <Calendar size={16} className="hidden md:block" />
                  Semana de 1-7 Julho, 2025
                </p>
              </div>
              <div className="text-left lg:text-right">
                <div className="text-xs md:text-sm text-gray-500">Partilhado por</div>
                <div className="font-semibold text-gray-800 text-sm md:text-base">CDP Centre of Competence</div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {regions.map(region => {
              const regionIcon = region === 'Portugal' ? '🇵🇹' : region === 'União Europeia' ? '🇪🇺' : '🌍';
              const items = curatedContent[selectedSector].filter(item => item.region === region).slice(0, 2);
              
              if (items.length === 0) return null;

              return (
                <div key={region} className="space-y-3">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-2">
                    <span className="text-lg md:text-xl">{regionIcon}</span>
                    {region}
                  </h3>
                  {items.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{item.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{item.summary}</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500 space-y-1 sm:space-y-0">
                        <span>Fonte: {item.source}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {curatedContent[selectedSector].length === 0 && (
              <div className="text-center py-8 md:py-12">
                <Globe size={36} className="mx-auto text-gray-400 mb-4 md:hidden" />
                <Globe size={48} className="mx-auto text-gray-400 mb-4 hidden md:block" />
                <p className="text-gray-500 text-sm md:text-base">Nenhum conteúdo disponível para esta semana</p>
              </div>
            )}
          </div>

            <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
            <div className="text-center text-xs md:text-sm text-gray-600">
              <p>Este relatório é curado semanalmente pelo Centro de Competência & Desenvolvimento</p>
              <p className="mt-1">Conselho da Diáspora Portuguesa • www.diaspora.gov.pt</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Login Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setCurrentView('login')}
          className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 flex items-center gap-2"
        >
          Admin Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView !== 'login' && currentView !== 'public' && (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2 md:gap-4">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">CDP Weekly Reports</h1>
                
                {/* Desktop sector buttons */}
                <div className="hidden lg:flex gap-1">
                  {sectors.map(sector => (
                    <button
                      key={sector.id}
                      onClick={() => setSelectedSector(sector.id)}
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
                        selectedSector === sector.id 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {sector.icon} {sector.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop navigation buttons */}
              <div className="hidden md:flex gap-2">
                {isAuthenticated && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
                      currentView === 'admin' 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Edit3 size={16} />
                    Admin
                  </button>
                )}
                <button
                  onClick={() => setCurrentView('community')}
                  className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
                    currentView === 'community' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users size={16} />
                  Comunidade
                </button>
                <button
                  onClick={() => setCurrentView('public')}
                  className={`px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
                    currentView === 'public' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Eye size={16} />
                  Relatório
                </button>
                
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="px-3 md:px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentView('login')}
                    className="px-3 md:px-4 py-2 rounded-lg text-sm bg-gray-600 text-white hover:bg-gray-700"
                  >
                    Login
                  </button>
                )}
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
                {/* Mobile sector selection */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 px-2">Setor:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sectors.map(sector => (
                      <button
                        key={sector.id}
                        onClick={() => {
                          setSelectedSector(sector.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-3 py-2 rounded-lg text-sm text-left ${
                          selectedSector === sector.id 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {sector.icon} {sector.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile navigation */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700 px-2">Navegação:</h3>
                  <div className="space-y-1">
                    {isAuthenticated && (
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 text-sm text-left ${
                          currentView === 'admin' 
                            ? 'bg-emerald-600 text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Edit3 size={16} />
                        Admin Dashboard
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentView('community');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 text-sm text-left ${
                        currentView === 'community' 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Users size={16} />
                      Comunidade CDP
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('public');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 text-sm text-left ${
                        currentView === 'public' 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Eye size={16} />
                      Relatório Público
                    </button>
                    
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg text-sm text-left text-red-600 hover:bg-red-50"
                      >
                        Sair (Logout)
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentView('login');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg text-sm text-left bg-gray-600 text-white hover:bg-gray-700"
                      >
                        Login Admin
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      )}

      {/* Main Content */}
      {currentView !== 'login' && currentView !== 'public' && (
        <div className="container mx-auto px-4 py-4 md:py-8">
          {currentView === 'login' && <LoginInterface />}
          {currentView === 'admin' && isAuthenticated && <AdminInterface />}
          {currentView === 'admin' && !isAuthenticated && <LoginInterface />}
          {currentView === 'community' && <CommunityInterface />}
        </div>
      )}
      
      {currentView === 'login' && <LoginInterface />}
      {currentView === 'public' && <PublicReport />}
    </div>
  );
};

export default CDPWeeklyReports;
