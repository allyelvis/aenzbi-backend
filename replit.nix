{ pkgs }: {
  deps = [
    pkgs.incus
    pkgs.haskellPackages.debian-binary
    pkgs.cowsay
  ];
}