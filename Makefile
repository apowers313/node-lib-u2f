INCLS=-Isrc/libu2ftest/HID
LIBPATH=-Lsrc/libu2ftest/HID
LIBS=-lu2ftest

.PHONY: lib/u2f-lib.dylib
all: lib/u2f-lib.dylib

lib/u2f-lib.dylib: src/u2f-lib.c Makefile
	gcc -dynamiclib -fPIC -o lib/u2f-lib.dylib $(INCLS) $(LIBPATH) $(LIBS) src/u2f-lib.c
	install_name_tool -change u2f-lib.0.dylib src/cbor/lib/u2f-lib.0.dylib lib/u2f-lib.dylib

src/libu2ftest/HID/libu2ftest.a: Makefile
	cd src/libu2ftest/HID && \
	make
