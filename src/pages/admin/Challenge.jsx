import { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import Swal from 'sweetalert2';

const generateCards = (gridSize, totalPairs) => {
  const pairs = Array.from({ length: totalPairs }, (_, i) => ({
    id: i,
    value: i + 1,
    matched: false,
  }));
  
  const allCards = [...pairs, ...pairs.map(card =>({...card, id: card.id + totalPairs}))];
  // Add one more card for odd number in 3x3 grid
  allCards.push({ id: allCards.length, value: totalPairs + 1, matched: false });
  return allCards.sort(() => Math.random() - 0.5);
};

const Challenge = () => {
  // Constants for 3x3 grid
  const GRID_SIZE = 3;
  const TOTAL_PAIRS = Math.floor((GRID_SIZE * GRID_SIZE) / 2);
  
  // State
  const [cards, setCards] = useState(() => generateCards(GRID_SIZE, TOTAL_PAIRS));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameOver(true);
            if (!gameOver && matched.length !== cards.length - 1) {
              Swal.fire({
                title: 'เสียใจด้วย',
                text: 'คุณเล่นไม่สำเร็จ',
                icon: 'error',
                confirmButtonText: 'ลองใหม่'
              }).then(() => {
                resetGame();
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, timeLeft, matched.length, cards.length, gameOver]);

  useEffect(() => {
    if (flipped.length === 2) {
      setIsLocked(true);
      const [first, second] = flipped;

      if (cards[first].value === cards[second].value) {
        setMatched(prev => [...prev, first, second]);
        setFlipped([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length - 1) {
      setGameOver(true);
    }
  }, [matched.length, cards.length]);

  const handleCardClick = (index) => {
    if (
      !isLocked && 
      !flipped.includes(index) && 
      !matched.includes(index) && 
      timeLeft > 0 &&
      !gameOver
    ) {
      setFlipped(prev => [...prev, index]);
    }
  };

  const resetGame = () => {
    setCards(generateCards(GRID_SIZE, TOTAL_PAIRS));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimeLeft(20);
    setGameOver(false);
    setGameStarted(false);
    setPlayerName('');
    setRoomNumber('');
    setIsLocked(false);
  };

  const handleStartGame = () => {
    if (!playerName || !roomNumber) {
      Swal.fire({
        title: 'กรุณากรอกข้อมูล',
        text: 'โปรดกรอกชื่อและเลขห้องให้ครบถ้วน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
      });
      return;
    }
    setGameStarted(true);
    setCards(generateCards(GRID_SIZE, TOTAL_PAIRS));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-[400px] lg:max-w-[500px] mx-auto p-2 sm:p-4">
        {!gameStarted ? (
          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-400 mb-4">กรุณากรอกข้อมูล</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">ชื่อผู้เล่น</label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="กรอกชื่อของคุณ"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">เลขห้อง</label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full p-2 rounded bg-slate-700 text-white"
                  placeholder="กรอกเลขห้องของคุณ"
                />
              </div>
              <button
                onClick={handleStartGame}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
              >
                เริ่มเกม
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-400">เกมจับคู่</h2>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-base sm:text-lg text-gray-300">เวลา: {timeLeft}s</span>
                <span className="text-base sm:text-lg text-gray-300">จำนวนครั้ง: {moves}</span>
                <button 
                  onClick={resetGame}
                  className="flex items-center gap-1 sm:gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <Shuffle className="w-3 h-3 sm:w-4 sm:h-4" />
                  เริ่มใหม่
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className={`aspect-square flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold rounded-lg sm:rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    flipped.includes(index) || matched.includes(index)
                      ? 'bg-blue-600 text-white rotate-0 shadow-lg shadow-blue-500/50'
                      : 'bg-slate-700 text-transparent rotate-180 hover:bg-slate-600'
                  }`}
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {(flipped.includes(index) || matched.includes(index)) && (
                    <span className="animate-bounce">{card.value}</span>
                  )}
                </div>
              ))}
            </div>

            {matched.length === cards.length - 1 && (
              <div className="mt-4 p-3 sm:p-4 bg-green-900 text-green-300 rounded-lg sm:rounded-xl text-center animate-pulse shadow-lg text-sm sm:text-base">
                🎉 ยินดีด้วย! คุณ {playerName} ห้อง {roomNumber} ชนะแล้ว ด้วยการเล่น {moves} ครั้ง ติดต่อadmin@wassawan.com เพื่อรับส่วนลดค่าห้อง
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Challenge;