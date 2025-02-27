import React from "react";
import { useNavigate } from "react-router-dom";
import DhikrList from "../components/DhikrList";

const sleepAdhkar = [
  {
    id: "s1",
    text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    translation: "In Your name, O Allah, I die and I live.",
    source: "رواه البخاري",
    count: 1,
  },
  {
    id: "s2",
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ: قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    translation:
      "In the name of Allah, the Beneficent, the Merciful. Say: He is Allah, the One! Allah, the eternally Besought of all! He begets not nor was begotten. And there is none comparable unto Him.",
    source: "الإخلاص: 1-4",
    count: 3,
  },
  {
    id: "s3",
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ: قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِنْ شَرِّ مَا خَلَقَ * وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    translation:
      "In the name of Allah, the Beneficent, the Merciful. Say: I seek refuge in the Lord of the Daybreak. From the evil of that which He created; From the evil of the darkness when it is intense, And from the evil of malignant witchcraft, And from the evil of the envier when he envies.",
    source: "الفلق: 1-5",
    count: 3,
  },
  {
    id: "s4",
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ: قُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَهِ النَّاسِ * مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ",
    translation:
      "In the name of Allah, the Beneficent, the Merciful. Say: I seek refuge in the Lord of mankind, The King of mankind, The God of mankind, From the evil of the sneaking whisperer, Who whispers in the hearts of mankind, Of the jinn and of mankind.",
    source: "الناس: 1-6",
    count: 3,
  },
  {
    id: "s5",
    text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    translation:
      "O Allah, protect me from Your punishment on the day when You resurrect Your servants.",
    source: "رواه أبو داود",
    count: 3,
  },
  {
    id: "s6",
    text: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ",
    translation:
      "O Allah, I submit myself to You, entrust my affairs to You, turn my face to You, and lay myself down depending upon You, hoping in You and fearing You. There is no refuge, and no escape, except to You. I believe in Your Book (the Qur'an) that You revealed, and the Prophet whom You sent.",
    source: "رواه البخاري ومسلم",
    count: 1,
  },
  {
    id: "s7",
    text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ",
    translation:
      "Praise be to Allah Who has fed us and given us drink, and Who has sufficed us and given us shelter, for how many are there with no one to suffice them or give them shelter.",
    source: "رواه مسلم",
    count: 1,
  },
];

const SleepAdhkar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleComplete = () => {
    // In a real app, we would save completion status to local storage or a database
    console.log("Sleep adhkar completed");
    navigate("/");
  };

  return (
    <DhikrList
      title="أذكار النوم"
      dhikrs={sleepAdhkar}
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
};

export default SleepAdhkar;
