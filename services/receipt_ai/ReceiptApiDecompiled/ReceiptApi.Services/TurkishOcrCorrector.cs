using System.Collections.Generic;
using System.Text.RegularExpressions;
using ReceiptApi.Models;

namespace ReceiptApi.Services;

public static class TurkishOcrCorrector
{
	private static readonly Dictionary<string, string> WordReplacements = new Dictionary<string, string>
	{
		{ "BEF1KTAF", "BEŞİKTAŞ" },
		{ "BEFIKTAF", "BEŞİKTAŞ" },
		{ "YSTANBUL", "İSTANBUL" },
		{ "MUKEL1EF1ER", "MÜKELLEFLER" },
		{ "PTEKERLY", "ŞEKERLİ" },
		{ "VANYLYN", "VANİLİN" },
		{ "BYM", "BİM" },
		{ "ALIPtVERYPT", "ALIŞVERİŞ" },
		{ "POPIETY", "POŞETİ" },
		{ "0NAY", "ONAY" },
		{ "PT", "Ş" }
	};

	public static string Correct(string text)
	{
		if (string.IsNullOrEmpty(text))
		{
			return text;
		}
		string text2 = text.ToUpperInvariant();
		foreach (KeyValuePair<string, string> wordReplacement in WordReplacements)
		{
			text2 = text2.Replace(wordReplacement.Key, wordReplacement.Value);
		}
		text2 = text2.Replace("PT", "Ş");
		text2 = Regex.Replace(text2, "BEF[1I]KTA[FŞ]", "BEŞİKTAŞ");
		if (text2.Contains("VANYLYN"))
		{
			text2 = text2.Replace("VANYLYN", "VANİLİN");
		}
		text2 = text2.Replace("YPT", "İŞ");
		text2 = text2.Replace("L1ER", "LER");
		if (text2.StartsWith("0NAY"))
		{
			text2 = "ONAY" + text2.Substring(4);
		}
		if (text2.Contains(" SUT"))
		{
			text2 = text2.Replace(" SUT", " SÜT");
		}
		if (text2.EndsWith(" SUT"))
		{
			text2 = text2.Substring(0, text2.Length - 3) + " SÜT";
		}
		return text2;
	}

	public static void CorrectBoxes(List<BoundingBox> boxes)
	{
		if (boxes == null)
		{
			return;
		}
		foreach (BoundingBox box in boxes)
		{
			box.Text = Correct(box.Text);
		}
	}
}
