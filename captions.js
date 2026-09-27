/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Ucu yukarı mı, yan mı?', en: 'Point up, or on its side?',
      note: 'Bir raptiyeyi masaya atalım. Ya ucu yukarı gelir ya da yan düşer. İki durum var ama eşit şanslı değiller; olasılığı hesaplayamayız. O halde deneyle tahmin edelim.' },
    { scene: 2, start: 10.8, end: 19.8, tr: '10 atışta 6 kez ucu yukarı', en: 'Point up 6 times in 10 throws',
      note: 'Raptiyeyi 10 kez atalım ve sonuçları yazalım: 6 kez ucu yukarı geldi, 4 kez yan düştü.' },
    { scene: 2, start: 20.2, end: 27.8, tr: 'Göreli sıklık: 6 ÷ 10 = 0,6', en: 'Relative frequency: 6 ÷ 10 = 0.6',
      note: 'Bir olayın göreli sıklığı, o olayın gerçekleşme sayısının deneme sayısına bölümüdür: 6 bölü 10, 0,6. Bu, olasılık için ilk tahminimiz.' },
    { scene: 3, start: 28.6, end: 38.6, tr: 'Az denemede çok değişiyor', en: 'With few throws it jumps around',
      note: 'Deneme sayısını artıralım. Grafik her atıştan sonraki göreli sıklığı gösteriyor. İlk atışlarda çok iniş çıkış var.' },
    { scene: 3, start: 39.0, end: 45.8, tr: '1000 atışta 0,62’ye yerleşiyor', en: 'After 1000 throws it settles at 0.62',
      note: 'Deneme arttıkça çizgi sakinleşiyor. 1000 atışta 618 kez ucu yukarı geldi: göreli sıklık yaklaşık 0,62’ye yerleşti.' },
    { scene: 4, start: 46.6, end: 55.0, tr: 'Madeni para: olasılık 0,5', en: 'A coin: the probability is 0.5',
      note: 'Olasılığını bildiğimiz bir deneyle karşılaştıralım. Madeni parada yazı gelme olasılığı 1 bölü 2, yani 0,5. İlk 10 atışta göreli sıklık 0,7 çıktı.' },
    { scene: 4, start: 55.4, end: 63.8, tr: 'Göreli sıklık olasılığa yaklaşıyor', en: 'The relative frequency nears the probability',
      note: '1000 atışta ise 502 kez yazı geldi: 0,50. Deneme sayısı arttıkça göreli sıklık gerçek olasılığa yaklaşıyor.' },
    { scene: 5, start: 64.6, end: 72.6, tr: 'Çok denemeyle: raptiye yaklaşık 0,62', en: 'With many throws: about 0.62',
      note: 'Öyleyse göreli sıklığı olasılık tahmini olarak kullanabiliriz: raptiyenin ucunun yukarı gelme olasılığı yaklaşık 0,62.' },
    { scene: 5, start: 73.0, end: 79.8, tr: 'Az deneme güvenilmez', en: 'Few throws are not reliable',
      note: 'Ama az denemeyle yapılan tahmin güvenilmez, çünkü sonuç çok değişebilir. Tahmin kesin bir değer değildir; deneme sayısı arttıkça daha güvenilir olur.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Çok deneme, iyi tahmin', en: 'Many trials, a good estimate',
      note: 'Aklında kalsın: göreli sıklık, olay sayısı bölü deneme sayısıdır. Deneme arttıkça olasılığa yaklaşır.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Olasılığı deneyle tahmin et!', en: 'Estimate probability by experiment!',
      note: 'Hesaplayamadığın olasılığı deneyle tahmin et!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
