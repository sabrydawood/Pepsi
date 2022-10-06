{ pkgs }: {
	deps = [
		pkgs.docker
  pkgs.unzip
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}