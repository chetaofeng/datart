/*
 * Datart
 * <p>
 * Copyright 2021
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package datart.core.common;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RequestContext {

    private static final InheritableThreadLocal<Map<String, Exception>> exceptions = new InheritableThreadLocal<>();

    public static void putWarning(String name, Exception exception) {
        Map<String, Exception> exceptionMap = exceptions.get();
        if (exceptionMap == null) {
            exceptionMap = new ConcurrentHashMap<>();
            exceptions.set(exceptionMap);
        }
        exceptionMap.put(name, exception);
    }

    public static Map<String, Exception> getWarnings() {
        return exceptions.get();
    }

    public static void clean() {
        exceptions.remove();
    }

}
