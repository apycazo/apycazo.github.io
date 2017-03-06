# Getting network interfaces
---
```java
import static java.lang.System.out;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

public class ListNets {

    public void listInterfaces()
    {
        try {
            Enumeration<NetworkInterface> nets = NetworkInterface.getNetworkInterfaces();
            for (NetworkInterface netint : Collections.list(nets)) {
                if (netint.isUp()) {
                    displayInterfaceInformation(netint);
                }
            }
        } catch (Exception e) {
            out.println("Captured exception: " + e.getClass().getSimpleName());
        }
    }

    public void displayInterfaceInformation(NetworkInterface netint) throws SocketException
    {
        out.printf("Display name: %s\n", netint.getDisplayName());
        out.printf("Name: %s\n", netint.getName());
        Enumeration<InetAddress> inetAddresses = netint.getInetAddresses();
        List<InetAddress> list = Collections.list(inetAddresses);
        list.forEach(addr -> {
            out.printf("InetAddress: %s\n", addr);
        });
        out.printf("\n");
    }
}
```
