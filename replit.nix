{ pkgs }: {
  deps = [
    pkgs.libxcrypt
    pkgs.nano
    pkgs.percona-server_8_0
    pkgs.openssh_gssapi
    pkgs.incus
    pkgs.haskellPackages.debian-binary
    pkgs.cowsay
  ];
}