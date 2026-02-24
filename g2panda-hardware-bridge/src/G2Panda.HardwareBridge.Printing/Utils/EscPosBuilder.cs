using System;
using System.Collections.Generic;
using System.Text;

namespace G2Panda.HardwareBridge.Printing.Utils;

public class EscPosBuilder
{
    private readonly List<byte> _buffer = new();

    public EscPosBuilder Initialize()
    {
        _buffer.AddRange(new byte[] { 0x1B, 0x40 }); // ESC @ (Initialize)
        _buffer.AddRange(new byte[] { 0x1B, 0x74, 13 }); // ESC t 13 (Select PC857 - Turkish)
        return this;
    }

    public EscPosBuilder PrintLine(string text)
    {
        // Convert to Windows-1254/PC857 for Turkish printers
        var encoding = System.Text.CodePagesEncodingProvider.Instance.GetEncoding(857) ?? Encoding.ASCII;
        _buffer.AddRange(encoding.GetBytes(text));
        _buffer.Add(0x0A); // LF
        return this;
    }

    public EscPosBuilder Bold(bool on)
    {
        _buffer.AddRange(new byte[] { 0x1B, 0x45, (byte)(on ? 1 : 0) });
        return this;
    }

    public EscPosBuilder SetFontSize(int size) // 1: normal, 2: double
    {
        _buffer.AddRange(new byte[] { 0x1D, 0x21, (byte)(size == 2 ? 0x11 : 0x00) });
        return this;
    }

    public EscPosBuilder Align(int align) // 0: Left, 1: Center, 2: Right
    {
        _buffer.AddRange(new byte[] { 0x1B, 0x61, (byte)align });
        return this;
    }

    public EscPosBuilder Separator()
    {
        return PrintLine("------------------------------");
    }

    public EscPosBuilder Feed(int lines = 1)
    {
        for (int i = 0; i < lines; i++) _buffer.Add(0x0A);
        return this;
    }

    public EscPosBuilder Cut()
    {
        _buffer.AddRange(new byte[] { 0x1D, 0x56, 66, 0 });
        return this;
    }

    public EscPosBuilder OpenCashDrawer()
    {
        _buffer.AddRange(new byte[] { 0x1B, 0x70, 0, 25, 250 });
        return this;
    }

    public byte[] Build() => _buffer.ToArray();
}
