# Java 8 Snippets
---
```java
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;

public class J8Reference {

    static String string = "0123456789ABCDEF";

    static interface Converter {

        String convert(String string);

        default String safeConvert(String string)
        {
            return string == null ? convert("") : convert(string);
        }
    }

    static class ConverterMethods {

        String formatA(String string)
        {
            return String.format("A [%s]", string);
        }

        String formatB(String string)
        {
            return String.format("B [%s]", string);
        }
    }

    static class TestSubject {

        int intValue;
        String stringValue;
        long longValue;

        public TestSubject(int intValue, String stringValue, long longValue)
        {
            this.intValue = intValue;
            this.stringValue = stringValue;
            this.longValue = longValue;
        }

        public int getIntValue()
        {
            return intValue;
        }

        public String getStringValue()
        {
            return stringValue;
        }

        public long getLongValue()
        {
            return longValue;
        }
    }

    public static void testPredicate()
    {

        Predicate<String> p = (x) -> x.length() > 10;
        System.out.println("Predicate value is " + p.test(string));
    }

    public static void testFunction()
    {

        Function<String, Integer> sizeOf = (x) -> {
            return x == null ? 0 : x.trim().length();
        };

        System.out.println("Length of string is " + sizeOf.apply(string));
        System.out.println("Length of null string is " + sizeOf.apply(null));
    }

    public static void testConsumer()
    {

        Consumer<String> consumer = (x) -> {
            System.out.println("Value to consume is " + x);
        };

        consumer.accept(string);
    }

    public static void testDoubleColon()
    {

        ConverterMethods cm = new ConverterMethods();
        Converter cA = cm::formatA;
        Converter cB = cm::formatB;

        Consumer<String> c = (x) -> {
            System.out.println("Consuming string");
            System.out.println(cA.safeConvert(x));
            System.out.println(cB.safeConvert(x));
        };

        c.accept(string);
        c.accept(null);
    }

    private static List<TestSubject> generateSubjects () {

        List<TestSubject> list = new LinkedList<>();
        for (int i = 0; i < 4; i++) {
            TestSubject ts = new TestSubject(i, "i=" + i, i*10);
            list.add(ts);
        }
        return list;
    }

    public static void testSorter()
    {
        System.out.println("Testing list sorting");
        List<TestSubject> list = generateSubjects();
        Consumer<TestSubject> c = (x) -> {
            System.out.printf("[%d:%s:%d]%n",
                    x.intValue,
                    x.stringValue,
                    x.longValue);
        };

        list.stream().forEach(c);
        list.sort(
                Comparator
                        .comparing(TestSubject::getIntValue)
                        .reversed()
        );
        System.out.println("Sorted");
        list.stream().forEach(c);
    }

    public static void testArrayStream()
    {
        String[] strings = {"a", "b", "c"};
        Arrays.stream(strings).forEach((x) -> {
            System.out.println("Value is " + x);
        });
    }

    public static void testMapReduce()
    {

        // Generate a value list
        List<TestSubject> list = TestSubject.samples();
        // Find the test subject with the longest string value
        String s = list.stream()
                .map(TestSubject::getStringValue)
                .reduce("", (a, b) -> a.length() >= b.length() ? a : b);
        System.out.println("Subjects are:");
        list.stream().forEach((x) -> System.out.println(x.getStringValue()));
        System.out.println("Longest values is :" + s);
    }

    public static void testSimpleCollect()
    {
        // Generate a value list
        List<TestSubject> list = TestSubject.samples();
        List<String> strList = list.stream()
                .filter(p -> p.getIntValue() < 4)
                .map(TestSubject::getStringValue)
                .collect(Collectors.toList());

        strList.stream().forEach(p -> System.out.println("Col: " + p));

    }

    public static void testGroupByCollect()
    {
        List<TestSubject> list = TestSubject.samples();
        Map<Long, List<TestSubject>> strList = list
                .stream()
                .collect(Collectors.groupingBy(TestSubject::getLongValue));
        strList.keySet().stream().forEach(
                key -> {
                    System.out.println("K:" + key);
                    List<TestSubject> entry = strList.get(key);
                    entry.stream().forEach(v -> {
                        System.out.println("\tV:" + v.getStringValue());
                    });
                }
        );
    }

    public static void testCollectionToMap()
    {
        List<TestSubject> list = TestSubject.samples();

        // Alternate to Function.identity() is p -> p        
        Map<Integer, TestSubject> map = list
                .stream()
                .collect(Collectors
                        .toMap(TestSubject::getIntValue, Function.identity())
                );

        map.keySet().stream().forEach(
                key -> {
                    TestSubject value = map.get(key);
                    System.out.println(key + ":" + value.getStringValue());
                }
        );
    }

}
```
