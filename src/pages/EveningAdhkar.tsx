import React from "react";
import { useNavigate } from "react-router-dom";
import DhikrList from "../components/DhikrList";

const eveningAdhkar = [
  {
    id: "e1",
    text: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ: اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    translation:
      "Allah! There is no god but He, the Living, the Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what is before or after or behind them. Nor shall they compass any of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them for He is the Most High, the Supreme.",
    source: "البقرة: 255",
    count: 1,
  },
  {
    id: "e2",
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ: قُلْ هُوَ اللَّهُ أَحَدٌ * اللَّهُ الصَّمَدُ * لَمْ يَلِدْ وَلَمْ يُولَدْ * وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    translation:
      "In the name of Allah, the Beneficent, the Merciful. Say: He is Allah, the One! Allah, the eternally Besought of all! He begets not nor was begotten. And there is none comparable unto Him.",
    source: "الإخلاص: 1-4",
    count: 3,
  },
  {
    id: "e3",
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ: قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ * مِنْ شَرِّ مَا خَلَقَ * وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ * وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ * وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    translation:
      "In the name of Allah, the Beneficent, the Merciful. Say: I seek refuge in the Lord of the Daybreak. From the evil of that which He created; From the evil of the darkness when it is intense, And from the evil of malignant witchcraft, And from the evil of the envier when he envies.",
    source: "الفلق: 1-5",
    count: 3,
  },
  {
    id: "e4",
    text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ: قُلْ أَعُوذُ بِرَبِّ النَّاسِ * مَلِكِ النَّاسِ * إِلَهِ النَّاسِ * مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ * الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ * مِنَ الْجِنَّةِ وَالنَّاسِ",
    translation:
      "In the name of Allah, the Beneficent, the Merciful. Say: I seek refuge in the Lord of mankind, The King of mankind, The God of mankind, From the evil of the sneaking whisperer, Who whispers in the hearts of mankind, Of the jinn and of mankind.",
    source: "الناس: 1-6",
    count: 3,
  },
  {
    id: "e5",
    text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ",
    translation:
      "We have reached the evening and at this very time all sovereignty belongs to Allah, Lord of the worlds. O Allah, I ask You for the good of this night, its triumphs and its victories, its light and its blessings and its guidance, and I take refuge in You from the evil of this night and the evil that follows it. O my Lord, I take refuge in You from laziness and the misery of old age. O my Lord, I take refuge in You from the torment of Hell-fire and the punishment of the grave.",
    source: "رواه مسلم",
    count: 1,
  },
  {
    id: "e6",
    text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    translation:
      "O Allah, by Your leave we have reached the evening and by Your leave we have reached the morning, by Your leave we live and die and unto You is our return.",
    source: "رواه الترمذي",
    count: 1,
  },
  {
    id: "e7",
    text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    translation: "Glory and praise be to Allah",
    source: "رواه مسلم",
    count: 100,
  },
];

const EveningAdhkar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  const handleComplete = () => {
    // Save completion status to local storage
    navigate("/");
  };

  return (
    <DhikrList
      title="أذكار المساء"
      category="evening"
      dhikrs={eveningAdhkar}
      onBack={handleBack}
      onComplete={handleComplete}
    />
  );
};

export default EveningAdhkar;
