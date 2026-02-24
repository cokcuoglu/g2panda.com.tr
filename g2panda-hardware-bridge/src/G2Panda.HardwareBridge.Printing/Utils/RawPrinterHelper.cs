using System;
using System.Runtime.InteropServices;
using System.ComponentModel;

namespace G2Panda.HardwareBridge.Printing.Utils;

public class RawPrinterHelper
{
    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Ansi)]
    public class DOCINFOA
    {
        [MarshalAs(UnmanagedType.LPStr)]
        public string pDocName = "G2Panda Print Job";
        [MarshalAs(UnmanagedType.LPStr)]
        public string pOutputFile = null;
        [MarshalAs(UnmanagedType.LPStr)]
        public string pDataType = "RAW";
    }

    [DllImport("winspool.Drv", EntryPoint = "OpenPrinterA", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool OpenPrinter([MarshalAs(UnmanagedType.LPStr)] string szPrinter, out IntPtr hPrinter, IntPtr pd);

    [DllImport("winspool.Drv", EntryPoint = "ClosePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool ClosePrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "StartDocPrinterA", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern uint StartDocPrinter(IntPtr hPrinter, uint Level, [In] DOCINFOA di);

    [DllImport("winspool.Drv", EntryPoint = "EndDocPrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool EndDocPrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "StartPagePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool StartPagePrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "EndPagePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool EndPagePrinter(IntPtr hPrinter);

    [DllImport("winspool.Drv", EntryPoint = "WritePrinter", SetLastError = true, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
    public static extern bool WritePrinter(IntPtr hPrinter, IntPtr pBytes, uint dwCount, out uint dwWritten);

    public static bool SendBytesToPrinter(string szPrinterName, byte[] bytes, out string errorMessage)
    {
        errorMessage = string.Empty;
        IntPtr pBytes = Marshal.AllocCoTaskMem(bytes.Length);
        Marshal.Copy(bytes, 0, pBytes, bytes.Length);

        IntPtr hPrinter = new IntPtr(0);
        DOCINFOA di = new DOCINFOA();
        bool bSuccess = false;

        try 
        {
            if (OpenPrinter(szPrinterName, out hPrinter, IntPtr.Zero))
            {
                if (StartDocPrinter(hPrinter, 1, di) != 0)
                {
                    if (StartPagePrinter(hPrinter))
                    {
                        uint dwWritten = 0;
                        bSuccess = WritePrinter(hPrinter, pBytes, (uint)bytes.Length, out dwWritten);
                        if (!bSuccess) errorMessage = $"WritePrinter failed: {new Win32Exception(Marshal.GetLastWin32Error()).Message}";
                        EndPagePrinter(hPrinter);
                    }
                    else errorMessage = $"StartPagePrinter failed: {new Win32Exception(Marshal.GetLastWin32Error()).Message}";
                    EndDocPrinter(hPrinter);
                }
                else errorMessage = $"StartDocPrinter failed: {new Win32Exception(Marshal.GetLastWin32Error()).Message}";
                ClosePrinter(hPrinter);
            }
            else errorMessage = $"OpenPrinter failed for '{szPrinterName}': {new Win32Exception(Marshal.GetLastWin32Error()).Message}";
        }
        catch (Exception ex)
        {
            errorMessage = $"Exception in RawPrinterHelper: {ex.Message}";
        }
        finally
        {
            Marshal.FreeCoTaskMem(pBytes);
        }
        
        return bSuccess;
    }
}
