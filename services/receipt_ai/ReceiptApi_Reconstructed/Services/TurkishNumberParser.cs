using System.Globalization;
using System.Text.RegularExpressions;

namespace ReceiptApi.Services;

public static class TurkishNumberParser
{
	public static decimal? Parse(string text)
	{
		text = Regex.Replace(text, "[^0-9.,-]", "");
		if (string.IsNullOrWhiteSpace(text))
		{
			return null;
		}
		if (text.Contains('.') && text.Contains(','))
		{
			int num = text.LastIndexOf('.');
			int num2 = text.LastIndexOf(',');
			text = ((num2 <= num) ? text.Replace(",", "") : text.Replace(".", "").Replace(',', '.'));
		}
		else if (text.Contains(','))
		{
			text = text.Replace(',', '.');
		}
		else if (text.Split('.').Length > 2)
		{
			int num3 = text.LastIndexOf('.');
			text = text.Substring(0, num3).Replace(".", "") + "." + text.Substring(num3 + 1);
		}
		if (decimal.TryParse(text, CultureInfo.InvariantCulture, out var result))
		{
			if (result > 1000000m || result < 0m)
			{
				return null;
			}
			return result;
		}
		return null;
	}
}
